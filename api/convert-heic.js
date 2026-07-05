const sharp = require('sharp');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ error: 'No image data received' });
    }

    const jpegBuffer = await sharp(buffer)
      .rotate() // auto-rotate based on EXIF
      .jpeg({ quality: 85 })
      .toBuffer();

    const base64 = jpegBuffer.toString('base64');
    return res.status(200).json({ 
      success: true, 
      base64: `data:image/jpeg;base64,${base64}` 
    });

  } catch (e) {
    console.error('HEIC conversion error:', e);
    return res.status(500).json({ error: e.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
