#!/bin/bash

echo "🚀 Starting FinanceAI Pro V2..."
echo ""

# Start backend
cd backend
echo "📡 Starting backend on http://localhost:3001..."
npm run dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend
cd ../frontend
echo "🎨 Starting frontend on http://localhost:3000..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both services running"
echo "   Backend PID: $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Wait for both
wait $BACKEND_PID $FRONTEND_PID
