#!/bin/bash

# Simple PM2 Fix Script
echo "🔧 Simple PM2 Fix - Let's get this working!"

# Step 1: Stop everything
echo "Stopping all PM2 processes..."
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Step 2: Navigate to app directory
echo "Navigating to app directory..."
mkdir -p /var/www/moneri-spa/server
cd /var/www/moneri-spa/server

# Step 3: Create .env file
echo "Creating .env file..."
cat > .env << 'EOF'
MONGO_URI=mongodb+srv://admin:Password123@spacluster.tkhog8t.mongodb.net/moneri?retryWrites=true&w=majority&appName=SpaCluster
JWT_SECRET=A_STRONG_SECRET_KEY_HERE
PORT=5001
NODE_ENV=production
EMAIL_USER=info@monerispaacademy.in
EMAIL_PASS=Info23456.
NOTIFICATION_EMAIL=info@monerispaacademy.in
ALLOWED_ORIGINS=https://monerispaacademy.in,https://www.monerispaacademy.in
EOF

# Step 4: Install dependencies
echo "Installing dependencies..."
npm install --production

# Step 5: Test server manually first
echo "Testing server manually..."
timeout 10s node server.js &
SERVER_PID=$!
sleep 5

if kill -0 $SERVER_PID 2>/dev/null; then
    echo "✅ Server test passed"
    kill $SERVER_PID
else
    echo "❌ Server test failed - checking logs..."
    node server.js &
    sleep 3
    kill %1 2>/dev/null
    exit 1
fi

# Step 6: Start with PM2
echo "Starting with PM2..."
pm2 start server.js --name "moneri-spa-server"

# Step 7: Save PM2 config
echo "Saving PM2 configuration..."
pm2 save

# Step 8: Check status
echo "Final status:"
pm2 status
pm2 logs moneri-spa-server --lines 10

echo "✅ PM2 setup complete!"
