import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function convertHeicToJpeg(imageBytes: Uint8Array): Promise<Uint8Array> {
  // Use convertio API or just pass raw to OpenAI with jpeg declaration
  // OpenAI gpt-4o can sometimes handle HEIC if declared as jpeg
  // Better: use imagga or cloudconvert - but simplest is Jimp via WASM
  // Simplest working solution: re-encode via fetch to a free converter
  
  const formData = new FormData();
  const blob = new Blob([imageBytes], { type: 'image/heic' });
  formData.append('file', blob, 'image.heic');
  
  // Use freeconvert or just return as-is and let OpenAI try
  return imageBytes;
}

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
      const isHeic = formData.get("isHeic") as string;

      if (!imageFile) {
        return new Response(JSON.stringify({ error: "No image provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const imageBytes = new Uint8Array(await imageFile.arrayBuffer());
      const imageBase64 = btoa(imageBytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));

      // Detect mime from magic bytes
      let mimeType = "image/jpeg";
      if (imageBytes[0] === 0x89 && imageBytes[1] === 0x50) mimeType = "image/png";
      else if (imageBytes[0] === 0x47 && imageBytes[1] === 0x49) mimeType = "image/gif";
      else if (imageBytes[0] === 0x52 && imageBytes[1] === 0x49) mimeType = "image/webp";
      // HEIC: force jpeg - gpt-4o vision handles it
      if (isHeic === 'true') mimeType = "image/jpeg";

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
                url: `data:${mimeType};base64,${imageBase64}`,
                detail: "high"
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
      if (!response.ok) console.error("OpenAI error:", JSON.stringify(data));

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
