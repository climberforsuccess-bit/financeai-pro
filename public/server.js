const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Si es una ruta que no existe, sirve app.html (SPA)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'app.html');
  }

  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.svg': 'image/svg+xml'
  };

  res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
