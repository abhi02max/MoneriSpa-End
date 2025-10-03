@echo off
echo 🚀 Starting SEO deployment for Moneri Spa & Academy...

REM Build the client with SEO optimizations
echo 📦 Building client with SEO optimizations...
cd client
call npm run build

REM Check if build was successful
if %errorlevel% neq 0 (
    echo ❌ Client build failed!
    pause
    exit /b 1
)

echo ✅ Client build successful!

REM Copy SEO files to build directory
echo 📋 Copying SEO files...
copy public\sitemap.xml build\
copy public\robots.txt build\
copy public\manifest.json build\

echo ✅ SEO files copied successfully!

REM Restart the server
echo 🔄 Restarting server...
cd ..\server
pm2 restart all

echo 🎉 SEO deployment completed!
echo.
echo 📋 Next steps for Google visibility:
echo 1. Submit sitemap to Google Search Console: https://monerispaacademy.in/sitemap.xml
echo 2. Create Google My Business listing
echo 3. Submit to local directories
echo 4. Start creating quality content
echo.
echo 📊 Monitor your progress:
echo - Google Search Console: https://search.google.com/search-console
echo - Google Analytics: https://analytics.google.com
echo - Google My Business: https://business.google.com

pause
