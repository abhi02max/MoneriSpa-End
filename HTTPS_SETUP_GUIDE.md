# HTTPS Setup Guide for Moneri Spa & Academy

## Overview
This guide will help you set up HTTPS for your Moneri Spa & Academy website to resolve the "Not Secure" warning.

## Option 1: Using Let's Encrypt (Recommended - Free)

### Prerequisites
- Domain name pointing to your server
- Server with root access
- Ports 80 and 443 open

### Step 1: Install Certbot
```bash
# For Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx

# For CentOS/RHEL
sudo yum install certbot python3-certbot-nginx
```

### Step 2: Stop your current application
```bash
sudo pm2 stop all
```

### Step 3: Generate SSL Certificate
```bash
sudo certbot --nginx -d monerispaacademy.in -d www.monerispaacademy.in
```

### Step 4: Configure Nginx for HTTPS
Create or update your nginx configuration:

```nginx
server {
    listen 80;
    server_name monerispaacademy.in www.monerispaacademy.in;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name monerispaacademy.in www.monerispaacademy.in;

    ssl_certificate /etc/letsencrypt/live/monerispaacademy.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/monerispaacademy.in/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy to your Node.js application
    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 5: Test and Reload
```bash
sudo nginx -t
sudo systemctl reload nginx
sudo pm2 start all
```

### Step 6: Auto-renewal Setup
```bash
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Option 2: Using Cloudflare (Easiest)

### Step 1: Sign up for Cloudflare
1. Go to [cloudflare.com](https://cloudflare.com)
2. Add your domain
3. Update your domain's nameservers to Cloudflare's

### Step 2: Enable SSL/TLS
1. Go to SSL/TLS → Overview
2. Set encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"

### Step 3: Configure Security Headers
1. Go to SSL/TLS → Edge Certificates
2. Enable "HTTP Strict Transport Security (HSTS)"
3. Go to Rules → Transform Rules to add security headers

## Option 3: Using a Reverse Proxy (Nginx + SSL)

### Step 1: Install Nginx
```bash
sudo apt install nginx
```

### Step 2: Configure Nginx
Create `/etc/nginx/sites-available/monerispaacademy`:

```nginx
server {
    listen 80;
    server_name monerispaacademy.in www.monerispaacademy.in;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name monerispaacademy.in www.monerispaacademy.in;

    # SSL Configuration (replace with your certificate paths)
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 3: Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/monerispaacademy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Testing HTTPS Setup

### Step 1: Test SSL Configuration
```bash
# Test your SSL setup
curl -I https://monerispaacademy.in

# Check SSL rating
# Visit: https://www.ssllabs.com/ssltest/
```

### Step 2: Update Environment Variables
Update your `.env` file:
```env
NODE_ENV=production
PORT=5001
# Add HTTPS redirect if needed
FORCE_HTTPS=true
```

### Step 3: Update CORS Settings
The server.js already has CORS configured for HTTPS domains.

## Troubleshooting

### Common Issues:
1. **Certificate not trusted**: Ensure you're using a valid SSL certificate
2. **Mixed content warnings**: Update all HTTP links to HTTPS
3. **CORS errors**: Update CORS settings in server.js
4. **Nginx errors**: Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### Security Checklist:
- [ ] SSL certificate installed and valid
- [ ] HTTP to HTTPS redirect working
- [ ] Security headers configured
- [ ] HSTS enabled
- [ ] Mixed content issues resolved
- [ ] CORS properly configured

## Maintenance

### Certificate Renewal (Let's Encrypt)
```bash
# Test renewal
sudo certbot renew --dry-run

# Manual renewal
sudo certbot renew
```

### Security Monitoring
- Regularly check SSL rating at SSL Labs
- Monitor certificate expiration
- Keep nginx and certbot updated

## Support

If you encounter issues:
1. Check nginx error logs
2. Verify certificate validity
3. Test with SSL Labs
4. Ensure all services are running

Your site should now be secure with HTTPS! 🔒
