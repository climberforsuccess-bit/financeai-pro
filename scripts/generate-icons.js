const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const publicDir = path.join(__dirname, "../public");

// SVG template
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#grad)"/>
  <text x="256" y="280" font-size="200" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">💰</text>
</svg>`;

const sizes = [192, 512];

Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`))
      .then(() => console.log(`✅ icon-${size}.png creado`))
  )
).then(() => {
  // También crear el apple icon
  return sharp(Buffer.from(svg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-icon.png"))
    .then(() => console.log("✅ apple-icon.png creado"));
}).catch((err) => console.error("❌ Error:", err));
