#!/bin/bash

# SEO Deployment Script for Moneri Spa & Academy
echo "🚀 Starting SEO deployment for Moneri Spa & Academy..."

# Build the client with SEO optimizations
echo "📦 Building client with SEO optimizations..."
cd client
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Client build successful!"
else
    echo "❌ Client build failed!"
    exit 1
fi

# Copy SEO files to build directory
echo "📋 Copying SEO files..."
cp public/sitemap.xml build/
cp public/robots.txt build/
cp public/manifest.json build/

# Set proper permissions
chmod 644 build/sitemap.xml
chmod 644 build/robots.txt
chmod 644 build/manifest.json

echo "✅ SEO files copied successfully!"

# Restart the server
echo "🔄 Restarting server..."
cd ../server
pm2 restart all

echo "🎉 SEO deployment completed!"
echo ""
echo "📋 Next steps for Google visibility:"
echo "1. Submit sitemap to Google Search Console: https://monerispaacademy.in/sitemap.xml"
echo "2. Create Google My Business listing"
echo "3. Submit to local directories"
echo "4. Start creating quality content"
echo ""
echo "📊 Monitor your progress:"
echo "- Google Search Console: https://search.google.com/search-console"
echo "- Google Analytics: https://analytics.google.com"
echo "- Google My Business: https://business.google.com"
