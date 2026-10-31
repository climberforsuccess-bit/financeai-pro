import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeSupabase } from './utils/supabase.js'
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import debtRoutes from './routes/debt.js'
import transactionRoutes from './routes/transactions.js'
import cardsRoutes from './routes/cards.js'
import { authMiddleware } from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Public routes
app.use('/api/auth', authRoutes)

// Protected routes
app.use('/api/dashboard', authMiddleware, dashboardRoutes)
app.use('/api/debt', authMiddleware, debtRoutes)
app.use('/api/transactions', authMiddleware, transactionRoutes)
app.use('/api/cards', authMiddleware, cardsRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

// Initialize Supabase before starting server
async function start() {
  try {
    await initializeSupabase()
    app.listen(PORT, () => {
      console.log(`🚀 Backend running at http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

start()
