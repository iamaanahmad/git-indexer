@echo off
REM Git Indexer CLI - Windows Setup Script
REM This script automates the installation process

cls
echo.
echo ═══════════════════════════════════════════════════════════════
echo   Git Indexer CLI - Windows Setup Script
echo ═══════════════════════════════════════════════════════════════
echo.

REM Check if Node.js is installed
echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then try running this script again.
    echo.
    pause
    exit /b 1
)
echo ✓ Node.js found: 
node --version
echo.

REM Check if npm is installed
echo [2/3] Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: npm is not installed!
    echo Please reinstall Node.js and make sure to include npm.
    echo.
    pause
    exit /b 1
)
echo ✓ npm found: 
npm --version
echo.

REM Install dependencies
echo [3/3] Installing dependencies...
echo This may take 30-60 seconds...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo ❌ ERROR: Installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo   ✅ Setup Complete!
echo ═══════════════════════════════════════════════════════════════
echo.
echo To start the Git Indexer CLI, run:
echo   npm start
echo.
echo Or simply press Enter to start now:
pause

cls
npm start
