@echo off
echo 🚀 Deploying Image Upload Fix for Moneri Spa & Academy...

echo 📥 Pulling latest changes from Git...
git pull origin main

echo 📦 Installing dependencies...
cd server
call npm install
cd ../client
call npm install

echo 🏗️ Building client...
call npm run build

echo 🔄 Restarting PM2 processes...
pm2 restart all

echo 📊 Checking PM2 status...
pm2 status

echo 📁 Checking uploads directory...
dir /root/monerispa-live/server/uploads/

echo 🔐 Setting proper permissions...
sudo chown -R www-data:www-data /root/monerispa-live/server/uploads/
sudo chmod -R 755 /root/monerispa-live/server/uploads/

echo ✅ Image upload fix deployed successfully!
echo.
echo 🎯 Test the fix by:
echo 1. Go to https://monerispaacademy.in/dashboard
echo 2. Upload an image
echo 3. Check if it appears in the gallery
echo.
echo 📊 Monitor logs with: pm2 logs moneri-spa-server

pause
