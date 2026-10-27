import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error)

  if (error.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors,
    })
  }

  if (error.status) {
    return res.status(error.status).json({ error: error.message })
  }

  res.status(500).json({ error: 'Internal server error' })
}
