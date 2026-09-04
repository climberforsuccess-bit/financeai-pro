const express = require('express')
const path = require('path')
const app = express()

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')))

// Para TODAS las rutas, servir app.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app.html'))
})

app.listen(3000, () => {
  console.log('✅ FinanceAI Pro running on http://localhost:3000')
  console.log('📱 Visit http://localhost:3000/app to start')
})
