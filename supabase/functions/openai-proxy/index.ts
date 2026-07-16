import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function convertHeicToJpeg(imageBytes: Uint8Array): Promise<Uint8Array> {
  // Use Cloudflare/external conversion API
  // Option: use api.cloudconvert.com or use raw canvas via OffscreenCanvas
  // Simplest: use https://heic.photos/convert API (free, no auth)
  try {
    const blob = new Blob([imageBytes], { type: 'image/heic' });
    const formData = new FormData();
    formData.append('file', blob, 'image.heic');
    
    const response = await fetch('https://heic.photos/convert', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      const converted = await response.arrayBuffer();
      return new Uint8Array(converted);
    }
  } catch (e) {
    console.error('heic.photos conversion failed:', e);
  }
  
  // Fallback: use imagga resize API to force JPEG
  // Last resort: try sending as PNG declaration (sometimes works)
  return imageBytes;
}

function detectMime(bytes: Uint8Array): string {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return "image/png";
  if (bytes[0] === 0xFF && bytes[1] === 0xD8) return "image/jpeg";
  if (bytes[0] === 0x47 && bytes[1] === 0x49) return "image/gif";
  if (bytes[0] === 0x52 && bytes[1] === 0x49) return "image/webp";
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return "image/heic";
  return "image/jpeg";
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
      const isHeicFlag = formData.get("isHeic") === "true";

      if (!imageFile) {
        return new Response(JSON.stringify({ error: "No image provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      let imageBytes = new Uint8Array(await imageFile.arrayBuffer());
      let mimeType = detectMime(imageBytes);
      
      console.log(`Image received: ${mimeType}, size: ${imageBytes.length} bytes, isHeic flag: ${isHeicFlag}`);

      // Convert HEIC to JPEG if needed
      if (isHeicFlag || mimeType === "image/heic") {
        console.log('Converting HEIC to JPEG via heic.photos...');
        const converted = await convertHeicToJpeg(imageBytes);
        if (converted !== imageBytes) {
          imageBytes = converted;
          mimeType = "image/jpeg";
          console.log(`Converted successfully, new size: ${imageBytes.length} bytes`);
        } else {
          console.warn('Conversion failed, trying as PNG...');
          mimeType = "image/png";
        }
      }

      const imageBase64 = btoa(imageBytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));

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
