#!/bin/bash

# DevForge Development Helper Script

echo "🚀 Starting DevForge Development Environment..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Clean build artifacts
echo "🧹 Cleaning build artifacts..."
npm run clean

# Start development server
echo "🔥 Starting development server..."
echo "📍 Local: http://localhost:5173/"
echo "🌐 Network: Use --host flag to expose"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
