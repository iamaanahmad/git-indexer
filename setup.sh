#!/bin/bash
# Git Indexer CLI - macOS/Linux Setup Script
# This script automates the installation process

clear

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "   Git Indexer CLI - Setup Script"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if Node.js is installed
echo "[1/3] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo ""
    echo "Or use Homebrew (macOS):"
    echo "  brew install node"
    echo ""
    echo "Or use package manager (Linux):"
    echo "  sudo apt install nodejs npm  (Ubuntu/Debian)"
    echo "  sudo dnf install nodejs npm  (Fedora)"
    echo ""
    exit 1
fi

echo "✓ Node.js found:"
node --version
echo ""

# Check if npm is installed
echo "[2/3] Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ ERROR: npm is not installed!"
    echo "Please reinstall Node.js with npm included."
    exit 1
fi

echo "✓ npm found:"
npm --version
echo ""

# Install dependencies
echo "[3/3] Installing dependencies..."
echo "This may take 30-60 seconds..."
echo ""

npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ ERROR: Installation failed!"
    echo "Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "   ✅ Setup Complete!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "To start the Git Indexer CLI, run:"
echo "   npm start"
echo ""
echo "Press Enter to start now:"
read

clear
npm start
