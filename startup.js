#!/usr/bin/env node

// Simple startup script for Azure App Service
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting KeyYatri application...');

try {
  // Check if dist folder exists, if not build it
  const fs = require('fs');
  const distPath = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('📦 Building application...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  
  // Start the server
  console.log('🌐 Starting server...');
  require('./serve.js');
  
} catch (error) {
  console.error('❌ Startup failed:', error.message);
  process.exit(1);
}
