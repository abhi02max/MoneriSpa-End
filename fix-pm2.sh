#!/bin/bash

# PM2 Troubleshooting and Fix Script
# Run this on your server: 31.97.235.220

echo "🔧 PM2 Troubleshooting and Fix Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Check current PM2 status
print_status "Checking current PM2 status..."
pm2 status

# Step 2: Stop all PM2 processes
print_status "Stopping all PM2 processes..."
pm2 stop all
pm2 delete all

# Step 3: Check if Node.js is working
print_status "Testing Node.js..."
node --version
npm --version

# Step 4: Navigate to app directory
print_status "Navigating to app directory..."
cd /var/www/moneri-spa/server

# Step 5: Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning "Creating .env file..."
    cat > .env << EOF
# Database
MONGO_URI=mongodb+srv://admin:Password123@spacluster.tkhog8t.mongodb.net/moneri?retryWrites=true&w=majority&appName=SpaCluster

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
    print_success ".env file created"
fi

# Step 6: Install dependencies
print_status "Installing server dependencies..."
npm install --production

# Step 7: Test the server manually first
print_status "Testing server manually..."
timeout 10s node server.js &
SERVER_PID=$!
sleep 5
if kill -0 $SERVER_PID 2>/dev/null; then
    print_success "Server test passed"
    kill $SERVER_PID
else
    print_error "Server test failed - check logs above"
    exit 1
fi

# Step 8: Start with PM2
print_status "Starting with PM2..."
pm2 start server.js --name "moneri-spa-server" --env production

# Step 9: Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Step 10: Set up PM2 startup
print_status "Setting up PM2 startup..."
pm2 startup

# Step 11: Check final status
print_status "Final PM2 status:"
pm2 status

print_status "Recent logs:"
pm2 logs moneri-spa-server --lines 20

print_success "PM2 setup completed!"
echo ""
echo "🔍 Troubleshooting Commands:"
echo "  pm2 status                    - Check status"
echo "  pm2 logs moneri-spa-server    - View logs"
echo "  pm2 restart moneri-spa-server - Restart app"
echo "  pm2 monit                     - Monitor resources"
echo ""
echo "🌐 Your site should be available at: https://monerispaacademy.in"
