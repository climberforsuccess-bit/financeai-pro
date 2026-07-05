import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    const OPENAI_KEY = Deno.env.get("OPENAI_KEY");

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const imageFile = formData.get("image") as File;
      const prompt = formData.get("prompt") as string;

      if (!imageFile) {
        return new Response(JSON.stringify({ error: "No image provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Send raw bytes to OpenAI Files API first, then use vision
      const imageBytes = new Uint8Array(await imageFile.arrayBuffer());
      
      // Try sending as PNG mime type (trick OpenAI into processing it)
      const imageBase64 = btoa(imageBytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));
      
      // Use OpenAI with PNG mime type declaration
      const body = {
        model: "gpt-4o",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt || "Analyze this receipt" },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${imageBase64}`,
                detail: "low"
              }
            }
          ]
        }]
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("OpenAI error:", JSON.stringify(data));
      }
      
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default JSON proxy
    const body = await req.json();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", JSON.stringify(data));
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
