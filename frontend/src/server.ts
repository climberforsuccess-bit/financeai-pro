import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboard.js'
import debtsRoutes from './routes/debts.js'
import transactionsRoutes from './routes/transactions.js'
import cardsRoutes from './routes/cards.js'
import reportsRoutes from './routes/reports.js'
import { authMiddleware } from './middleware/auth.js'
import { initializeSupabase } from './utils/supabase.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(express.json())

// Initialize Supabase
await initializeSupabase()

// Routes
app.use('/api/dashboard', authMiddleware, dashboardRoutes)
app.use('/api/debts', authMiddleware, debtsRoutes)
app.use('/api/transactions', authMiddleware, transactionsRoutes)
app.use('/api/cards', authMiddleware, cardsRoutes)
app.use('/api/reports', authMiddleware, reportsRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
})
