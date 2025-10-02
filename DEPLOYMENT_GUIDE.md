# 🚀 Moneri Spa Academy - Production Deployment Guide

## Server Details
- **IP**: 31.97.235.220
- **User**: root
- **Domain**: monerispaacademy.in
- **App Directory**: /var/www/moneri-spa

## 🔧 Quick Fix for PM2 Issues

### Step 1: Connect to your server
```bash
ssh root@31.97.235.220
```

### Step 2: Run the PM2 fix script
```bash
# Upload the fix script to your server first
scp fix-pm2.sh root@31.97.235.220:/tmp/
ssh root@31.97.235.220 "chmod +x /tmp/fix-pm2.sh && /tmp/fix-pm2.sh"
```

### Step 3: Check PM2 status
```bash
pm2 status
pm2 logs moneri-spa-server
```

## 🛠️ Complete Deployment Process

### Option 1: Automated Deployment
```bash
# Run the production deployment script
chmod +x deploy-production.sh
./deploy-production.sh
```

### Option 2: Manual Deployment

#### 1. Prepare your local files
```bash
# Build the client
cd client
npm run build:prod

# Create server .env
cd ../server
cat > .env << EOF
MONGO_URI=mongodb+srv://admin:Password123@spacluster.tkhog8t.mongodb.net/moneri?retryWrites=true&w=majority&appName=SpaCluster
JWT_SECRET=A_STRONG_SECRET_KEY_HERE
PORT=5001
NODE_ENV=production
EMAIL_USER=info@monerispaacademy.in
EMAIL_PASS=Info23456.
NOTIFICATION_EMAIL=info@monerispaacademy.in
ALLOWED_ORIGINS=https://monerispaacademy.in,https://www.monerispaacademy.in
EOF
```

#### 2. Upload to server
```bash
# Create deployment package
tar -czf moneri-spa-deploy.tar.gz server/ client/build/ ecosystem.config.js

# Upload to server
scp moneri-spa-deploy.tar.gz root@31.97.235.220:/tmp/
```

#### 3. Deploy on server
```bash
ssh root@31.97.235.220 << 'EOF'
    # Create app directory
    mkdir -p /var/www/moneri-spa
    cd /var/www/moneri-spa
    
    # Extract files
    tar -xzf /tmp/moneri-spa-deploy.tar.gz
    
    # Install dependencies
    cd server
    npm install --production
    
    # Install PM2 if not installed
    npm install -g pm2
    
    # Stop existing processes
    pm2 stop all
    pm2 delete all
    
    # Start with PM2
    pm2 start server.js --name "moneri-spa-server" --env production
    
    # Save PM2 configuration
    pm2 save
    pm2 startup
    
    # Check status
    pm2 status
    pm2 logs moneri-spa-server --lines 10
EOF
```

## 🌐 Nginx Configuration

### 1. Install Nginx (if not installed)
```bash
ssh root@31.97.235.220
apt update
apt install nginx -y
```

### 2. Configure Nginx
```bash
# Upload nginx config
scp nginx-config.conf root@31.97.235.220:/etc/nginx/sites-available/monerispaacademy.in

# Enable the site
ssh root@31.97.235.220 << 'EOF'
    ln -s /etc/nginx/sites-available/monerispaacademy.in /etc/nginx/sites-enabled/
    nginx -t
    systemctl reload nginx
EOF
```

### 3. SSL Certificate (Let's Encrypt)
```bash
ssh root@31.97.235.220 << 'EOF'
    # Install certbot
    apt install certbot python3-certbot-nginx -y
    
    # Get SSL certificate
    certbot --nginx -d monerispaacademy.in -d www.monerispaacademy.in
    
    # Test auto-renewal
    certbot renew --dry-run
EOF
```

## 🔍 Troubleshooting Commands

### Check PM2 Status
```bash
ssh root@31.97.235.220 "pm2 status"
```

### View PM2 Logs
```bash
ssh root@31.97.235.220 "pm2 logs moneri-spa-server"
```

### Restart PM2 Process
```bash
ssh root@31.97.235.220 "pm2 restart moneri-spa-server"
```

### Check Server Health
```bash
curl http://31.97.235.220:5001/api/health
```

### Check Nginx Status
```bash
ssh root@31.97.235.220 "systemctl status nginx"
```

## 🚨 Common Issues & Solutions

### Issue 1: PM2 shows "errored" status
**Solution:**
```bash
ssh root@31.97.235.220 << 'EOF'
    pm2 delete all
    cd /var/www/moneri-spa/server
    pm2 start server.js --name "moneri-spa-server"
    pm2 save
EOF
```

### Issue 2: Database connection errors
**Solution:**
```bash
ssh root@31.97.235.220 << 'EOF'
    cd /var/www/moneri-spa/server
    # Check .env file exists and has correct MongoDB URI
    cat .env
    # Test connection
    node -e "require('dotenv').config(); console.log('MongoDB URI:', process.env.MONGO_URI)"
EOF
```

### Issue 3: Port 5001 not accessible
**Solution:**
```bash
ssh root@31.97.235.220 << 'EOF'
    # Check if port is in use
    netstat -tlnp | grep :5001
    # Check firewall
    ufw status
    # Allow port if needed
    ufw allow 5001
EOF
```

### Issue 4: Nginx 502 Bad Gateway
**Solution:**
```bash
ssh root@31.97.235.220 << 'EOF'
    # Check if Node.js server is running
    pm2 status
    # Check Nginx error logs
    tail -f /var/log/nginx/error.log
    # Restart both services
    pm2 restart moneri-spa-server
    systemctl restart nginx
EOF
```

## 📊 Monitoring Commands

### Real-time PM2 Monitoring
```bash
ssh root@31.97.235.220 "pm2 monit"
```

### Check System Resources
```bash
ssh root@31.97.235.220 "htop"
```

### Check Disk Space
```bash
ssh root@31.97.235.220 "df -h"
```

## 🎯 Final Checklist

- [ ] PM2 process is running (`pm2 status`)
- [ ] Server responds to health check (`curl http://localhost:5001/api/health`)
- [ ] Nginx is configured and running (`systemctl status nginx`)
- [ ] SSL certificate is installed and working
- [ ] Domain points to your server IP
- [ ] MongoDB connection is working
- [ ] All environment variables are set correctly

## 🌐 Your Site URLs

- **Main Site**: https://monerispaacademy.in
- **Admin Panel**: https://monerispaacademy.in/admin
- **Health Check**: https://monerispaacademy.in/api/health

## 📞 Support Commands

If you need to debug further:

```bash
# Full system check
ssh root@31.97.235.220 << 'EOF'
    echo "=== PM2 Status ==="
    pm2 status
    echo "=== PM2 Logs ==="
    pm2 logs moneri-spa-server --lines 20
    echo "=== Nginx Status ==="
    systemctl status nginx
    echo "=== Port Check ==="
    netstat -tlnp | grep :5001
    echo "=== Disk Space ==="
    df -h
EOF
```

Your Moneri Spa Academy should now be live and running smoothly! 🎉
