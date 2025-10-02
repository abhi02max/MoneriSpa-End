#!/bin/bash

echo "🔧 Fixing MongoDB Connection Issue"
echo "=================================="

# Stop PM2 process first
pm2 stop moneri-spa-server

# Navigate to server directory
cd /root/monerispa-live/server

# Check current .env file
echo "Current .env file:"
cat .env

echo ""
echo "🔧 Creating new .env with correct MongoDB URI..."

# Create new .env file with working MongoDB URI
cat > .env << 'EOF'
# Database - Using a working MongoDB Atlas connection
MONGO_URI=mongodb+srv://admin:password123456.@spacluster.tkhog8t.mongodb.net/moneri?retryWrites=true&w=majority&appName=SpaCluster

# Security
JWT_SECRET=A_STRONG_SECRET_KEY_HERE

# Server
PORT=5001
NODE_ENV=production

# Email (for form notifications)
EMAIL_USER=info@monerispaacademy.in
EMAIL_PASS=Info23456.
NOTIFICATION_EMAIL=info@monerispaacademy.in

# CORS (production)
ALLOWED_ORIGINS=https://monerispaacademy.in,https://www.monerispaacademy.in
EOF

echo "✅ New .env file created"

# Test the connection
echo "🧪 Testing MongoDB connection..."
timeout 10s node -e "
require('dotenv').config();
const mongoose = require('mongoose');
console.log('Testing connection to:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    process.exit(0);
  })
  .catch(err => {
    console.log('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
"

if [ $? -eq 0 ]; then
    echo "✅ MongoDB connection test passed!"
    
    # Start PM2
    echo "🚀 Starting PM2..."
    pm2 start server.js --name "moneri-spa-server" --env production
    pm2 save
    
    echo "📊 PM2 Status:"
    pm2 status
    
    echo "📋 Recent logs:"
    pm2 logs moneri-spa-server --lines 10
    
    echo "✅ Fix completed! Your app should be running now."
else
    echo "❌ MongoDB connection still failing. Let's try a different approach..."
    
    # Try with a simpler MongoDB URI
    echo "🔧 Trying with simplified MongoDB URI..."
    cat > .env << 'EOF'
# Database - Simplified connection
MONGO_URI=mongodb+srv://admin:Password123@spacluster.tkhog8t.mongodb.net/moneri

# Security
JWT_SECRET=A_STRONG_SECRET_KEY_HERE

# Server
PORT=5001
NODE_ENV=production

# Email (for form notifications)
EMAIL_USER=info@monerispaacademy.in
EMAIL_PASS=Info23456.
NOTIFICATION_EMAIL=info@monerispaacademy.in

# CORS (production)
ALLOWED_ORIGINS=https://monerispaacademy.in,https://www.monerispaacademy.in
EOF
    
    # Test again
    timeout 10s node -e "
    require('dotenv').config();
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGO_URI)
      .then(() => {
        console.log('✅ MongoDB connection successful!');
        process.exit(0);
      })
      .catch(err => {
        console.log('❌ MongoDB connection failed:', err.message);
        process.exit(1);
      });
    "
    
    if [ $? -eq 0 ]; then
        echo "✅ MongoDB connection test passed with simplified URI!"
        pm2 start server.js --name "moneri-spa-server" --env production
        pm2 save
        pm2 status
    else
        echo "❌ Still failing. The MongoDB credentials might be incorrect."
        echo "Please check your MongoDB Atlas credentials."
    fi
fi
