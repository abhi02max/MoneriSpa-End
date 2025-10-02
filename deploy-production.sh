#!/bin/bash

# Moneri Spa Academy - Production Deployment Script
# For SSH deployment on server: 31.97.235.220

echo "🚀 Starting Production Deployment for Moneri Spa Academy..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Server details
SERVER_IP="31.97.235.220"
SERVER_USER="root"
APP_DIR="/var/www/moneri-spa"
DOMAIN="monerispaacademy.in"

print_status "Deploying to server: $SERVER_IP"

# Step 1: Create production build
print_status "Building client for production..."
cd client
npm run build:prod
if [ $? -ne 0 ]; then
    print_error "Failed to build client"
    exit 1
fi
print_success "Client built successfully"

# Step 2: Create server .env file
print_status "Creating server environment file..."
cd ../server
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
print_success "Server .env created"

# Step 3: Create deployment package
print_status "Creating deployment package..."
cd ..
tar -czf moneri-spa-deploy.tar.gz server/ client/build/ ecosystem.config.js
print_success "Deployment package created"

# Step 4: Upload to server
print_status "Uploading to server..."
scp moneri-spa-deploy.tar.gz $SERVER_USER@$SERVER_IP:/tmp/
if [ $? -ne 0 ]; then
    print_error "Failed to upload to server"
    exit 1
fi
print_success "Uploaded to server"

# Step 5: Deploy on server
print_status "Deploying on server..."
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    echo "🚀 Starting server deployment..."
    
    # Create app directory
    mkdir -p /var/www/moneri-spa
    cd /var/www/moneri-spa
    
    # Extract deployment package
    tar -xzf /tmp/moneri-spa-deploy.tar.gz
    
    # Install server dependencies
    cd server
    npm install --production
    
    # Install PM2 globally if not installed
    if ! command -v pm2 &> /dev/null; then
        npm install -g pm2
    fi
    
    # Stop existing PM2 processes
    pm2 stop moneri-spa-server 2>/dev/null || true
    pm2 delete moneri-spa-server 2>/dev/null || true
    
    # Start with PM2
    pm2 start ../ecosystem.config.js --env production
    
    # Save PM2 configuration
    pm2 save
    pm2 startup
    
    echo "✅ Deployment completed!"
    echo "📊 PM2 Status:"
    pm2 status
    echo "📋 PM2 Logs:"
    pm2 logs moneri-spa-server --lines 10
EOF

if [ $? -ne 0 ]; then
    print_error "Deployment failed on server"
    exit 1
fi

print_success "Deployment completed successfully!"

echo ""
echo "🌐 Your site should be available at: https://$DOMAIN"
echo "📊 Check PM2 status: ssh $SERVER_USER@$SERVER_IP 'pm2 status'"
echo "📋 Check logs: ssh $SERVER_USER@$SERVER_IP 'pm2 logs moneri-spa-server'"
echo "🔄 Restart if needed: ssh $SERVER_USER@$SERVER_IP 'pm2 restart moneri-spa-server'"
echo ""
print_success "Moneri Spa Academy is now live! 🎉"
