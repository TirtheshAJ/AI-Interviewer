@echo off
REM AI Interview Simulator - Setup Script for Windows
REM This script installs all dependencies and starts both backend and frontend

echo.
echo ========================================
echo AI Interview Simulator - Setup Script
echo ========================================
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python 3 is not installed. Please install Python 3.8+
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do echo ✓ Python found: %%i

REM Check Node.js
echo.
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 14+
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo ✓ Node.js found: %%i

REM Setup Backend
echo.
echo Setting up Backend...
cd backend
echo Installing Python dependencies...
pip install -r requirements.txt >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend dependencies installed
) else (
    echo ✗ Failed to install backend dependencies
    exit /b 1
)
cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend
echo Installing Node dependencies...
call npm install >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend dependencies installed
) else (
    echo ✗ Failed to install frontend dependencies
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To run the application:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   python server.py
echo.
echo Terminal 2 (Frontend):
echo   cd frontend
echo   npm start
echo.
echo Then open http://localhost:3000 in your browser
echo.
pause
