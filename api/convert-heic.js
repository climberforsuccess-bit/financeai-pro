import heicConvert from 'heic-convert';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { base64 } = req.body;
    if (!base64) return res.status(400).json({ error: 'No image provided' });

    const base64Data = base64.replace(/^data:[^;]+;base64,/, '');
    const inputBuffer = Buffer.from(base64Data, 'base64');

    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.85
    });

    const jpegBase64 = 'data:image/jpeg;base64,' + Buffer.from(outputBuffer).toString('base64');
    res.status(200).json({ base64: jpegBase64 });

  } catch (err) {
    console.error('HEIC conversion error:', err);
    res.status(500).json({ error: 'Conversion failed', details: err.message });
  }
}
