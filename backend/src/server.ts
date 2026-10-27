import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dashboardRoutes from './routes/dashboard'
import debtRoutes from './routes/debt'
import transactionRoutes from './routes/transaction'
import authRoutes from './routes/auth'
import { initializeSupabase } from './utils/supabase'
import { authMiddleware } from './middleware/auth'
import { errorHandler } from './middleware/errorHandler'

const app: Express = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/debt', authMiddleware, debtRoutes)
app.use('/api/transaction', authMiddleware, transactionRoutes)
app.use('/api/auth', authRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' })
})

// Error handler
app.use(errorHandler)

// Initialize and start
async function start() {
  try {
    await initializeSupabase()
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()
