#!/bin/bash

# Moneri Spa Academy - Production Deployment Script
# Domain: monerispaacademy.in

echo "🚀 Starting Moneri Spa Academy Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install server dependencies"
    exit 1
fi
print_success "Server dependencies installed"

print_status "Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install client dependencies"
    exit 1
fi
print_success "Client dependencies installed"

print_status "Building client for production..."
npm run build:prod
if [ $? -ne 0 ]; then
    print_error "Failed to build client"
    exit 1
fi
print_success "Client built successfully"

print_status "Setting up environment files..."

# Create server .env if it doesn't exist
if [ ! -f "../server/.env" ]; then
    print_warning "Creating server .env file. Please update with your production values."
    cat > ../server/.env << EOF
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
    print_warning "Please update server/.env with your production values"
fi

# Create client .env if it doesn't exist
if [ ! -f ".env" ]; then
    print_warning "Creating client .env file."
    cat > .env << EOF
# API Configuration
REACT_APP_API_URL=https://monerispaacademy.in/api
REACT_APP_BASE_URL=https://monerispaacademy.in

# Environment
NODE_ENV=production
EOF
    print_success "Client .env created"
fi

print_status "Deployment preparation complete!"

echo ""
echo "📋 Next Steps:"
echo "1. Update server/.env with your production database and email credentials"
echo "2. Set up SSL certificates for HTTPS"
echo "3. Configure your web server (Nginx/Apache) to serve the built files"
echo "4. Set up process management (PM2) for the Node.js server"
echo "5. Configure your domain DNS to point to your server"
echo ""
echo "🔧 Production Commands:"
echo "  Server: cd server && npm run prod"
echo "  Client: Built files are in client/build/"
echo ""
echo "🌐 Domain: monerispaacademy.in"
echo "📧 Admin Email: info@monerispaacademy.in"
echo ""
print_success "Deployment script completed successfully!"
