#!/bin/bash

echo "🚀 Deploying Image Upload Fix for Moneri Spa & Academy..."

# Navigate to project directory
cd /root/monerispa-live

# Pull latest changes
echo "📥 Pulling latest changes from Git..."
git pull origin main

# Install any new dependencies
echo "📦 Installing dependencies..."
cd server && npm install
cd ../client && npm install

# Build client
echo "🏗️ Building client..."
npm run build

# Restart PM2 processes
echo "🔄 Restarting PM2 processes..."
pm2 restart all

# Check PM2 status
echo "📊 Checking PM2 status..."
pm2 status

# Test uploads directory
echo "📁 Checking uploads directory..."
ls -la /root/monerispa-live/server/uploads/

# Set proper permissions
echo "🔐 Setting proper permissions..."
sudo chown -R www-data:www-data /root/monerispa-live/server/uploads/
sudo chmod -R 755 /root/monerispa-live/server/uploads/

echo "✅ Image upload fix deployed successfully!"
echo ""
echo "🎯 Test the fix by:"
echo "1. Go to https://monerispaacademy.in/dashboard"
echo "2. Upload an image"
echo "3. Check if it appears in the gallery"
echo ""
echo "📊 Monitor logs with: pm2 logs moneri-spa-server"
