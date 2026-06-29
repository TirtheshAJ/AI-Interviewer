#!/bin/bash

# AI Interview Simulator - Setup Script
# This script installs all dependencies and starts both backend and frontend

echo ""
echo "========================================"
echo "AI Interview Simulator - Setup Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Python
echo -e "${BLUE}Checking Python installation...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed. Please install Python 3.8+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python found: $(python3 --version)${NC}"

# Check Node.js
echo ""
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 14+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Setup Backend
echo ""
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend
echo -e "${YELLOW}Installing Python dependencies...${NC}"
pip install -r requirements.txt > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install backend dependencies${NC}"
    exit 1
fi
cd ..

# Setup Frontend
echo ""
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend
echo -e "${YELLOW}Installing Node dependencies...${NC}"
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
    exit 1
fi
cd ..

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}To run the application:${NC}"
echo ""
echo -e "${BLUE}Terminal 1 (Backend):${NC}"
echo -e "  cd backend"
echo -e "  python server.py"
echo ""
echo -e "${BLUE}Terminal 2 (Frontend):${NC}"
echo -e "  cd frontend"
echo -e "  npm start"
echo ""
echo -e "${GREEN}Then open http://localhost:3000 in your browser${NC}"
echo ""
