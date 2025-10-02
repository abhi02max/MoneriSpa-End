#!/bin/bash

# PM2 Debug Script - Run this on your server
echo "🔍 PM2 Debug Script - Let's find the issue!"
echo "=========================================="

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

# Step 1: Check PM2 status
print_status "Current PM2 status:"
pm2 status

echo ""
print_status "PM2 logs (last 50 lines):"
pm2 logs --lines 50

echo ""
print_status "PM2 error logs:"
pm2 logs --err --lines 20

# Step 2: Check if the app directory exists
print_status "Checking app directory:"
if [ -d "/var/www/moneri-spa/server" ]; then
    print_success "App directory exists"
    ls -la /var/www/moneri-spa/server/
else
    print_error "App directory does not exist!"
    echo "Creating app directory..."
    mkdir -p /var/www/moneri-spa/server
fi

# Step 3: Check if server.js exists
print_status "Checking server.js:"
if [ -f "/var/www/moneri-spa/server/server.js" ]; then
    print_success "server.js exists"
else
    print_error "server.js not found!"
    echo "Current directory contents:"
    ls -la /var/www/moneri-spa/
fi

# Step 4: Check if .env file exists
print_status "Checking .env file:"
if [ -f "/var/www/moneri-spa/server/.env" ]; then
    print_success ".env file exists"
    echo "Environment variables:"
    cat /var/www/moneri-spa/server/.env
else
    print_error ".env file not found!"
fi

# Step 5: Check Node.js and npm
print_status "Checking Node.js and npm:"
node --version
npm --version

# Step 6: Check if dependencies are installed
print_status "Checking node_modules:"
if [ -d "/var/www/moneri-spa/server/node_modules" ]; then
    print_success "node_modules exists"
else
    print_error "node_modules not found!"
    echo "Installing dependencies..."
    cd /var/www/moneri-spa/server
    npm install --production
fi

# Step 7: Test the server manually
print_status "Testing server manually (5 seconds):"
cd /var/www/moneri-spa/server
timeout 5s node server.js &
SERVER_PID=$!
sleep 2
if kill -0 $SERVER_PID 2>/dev/null; then
    print_success "Server started successfully"
    kill $SERVER_PID
else
    print_error "Server failed to start"
    echo "Manual test output:"
    node server.js &
    sleep 3
    kill %1 2>/dev/null
fi

# Step 8: Check port usage
print_status "Checking port 5001:"
netstat -tlnp | grep :5001 || echo "Port 5001 is free"

# Step 9: Check system resources
print_status "System resources:"
echo "Memory usage:"
free -h
echo "Disk usage:"
df -h /var/www/moneri-spa/

echo ""
print_status "=== DEBUG COMPLETE ==="
echo "Please share this output to identify the issue!"