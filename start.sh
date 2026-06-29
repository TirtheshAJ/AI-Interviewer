#!/bin/bash

# Quick start script - starts both backend and frontend in background
# Usage: ./start.sh

echo ""
echo "========================================"
echo "AI Interview Simulator - Quick Start"
echo "========================================"
echo ""

# Start Backend
echo "Starting Backend Server..."
cd backend
python server.py &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"
cd ..

sleep 2

# Start Frontend
echo ""
echo "Starting Frontend Server..."
cd frontend
npm start &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"
cd ..

echo ""
echo "========================================"
echo "Both servers are running!"
echo "========================================"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for interrupt
wait

# Cleanup
echo ""
echo "Shutting down servers..."
kill $BACKEND_PID
kill $FRONTEND_PID
echo "Servers stopped."
