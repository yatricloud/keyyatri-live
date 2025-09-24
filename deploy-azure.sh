#!/bin/bash

# Azure deployment script
echo "🚀 Starting Azure deployment..."

# Check Node.js version
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! dist folder created."
    ls -la dist/
else
    echo "❌ Build failed! dist folder not found."
    exit 1
fi

echo "🎉 Deployment preparation complete!"
