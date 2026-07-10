const sharp = require('sharp');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { base64 } = req.body;
    if (!base64) return res.status(400).json({ error: 'No image provided' });

    // Remove data URL prefix if present
    const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const jpegBuffer = await sharp(buffer)
      .jpeg({ quality: 85 })
      .toBuffer();

    const jpegBase64 = 'data:image/jpeg;base64,' + jpegBuffer.toString('base64');
    res.status(200).json({ base64: jpegBase64 });

  } catch (err) {
    console.error('HEIC conversion error:', err);
    res.status(500).json({ error: 'Conversion failed', details: err.message });
  }
}
