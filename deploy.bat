@echo off
REM Moneri Spa Academy - Production Deployment Script for Windows
REM Domain: monerispaacademy.in

echo 🚀 Starting Moneri Spa Academy Deployment...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

echo [INFO] Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install server dependencies
    exit /b 1
)
echo [SUCCESS] Server dependencies installed

echo [INFO] Installing client dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install client dependencies
    exit /b 1
)
echo [SUCCESS] Client dependencies installed

echo [INFO] Building client for production...
call npm run build:prod
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build client
    exit /b 1
)
echo [SUCCESS] Client built successfully

echo [INFO] Setting up environment files...

REM Create server .env if it doesn't exist
if not exist "..\server\.env" (
    echo [WARNING] Creating server .env file. Please update with your production values.
    (
        echo # Database
        echo MONGO_URI=mongodb+srv://admin:Password123@spacluster.tkhog8t.mongodb.net/moneri?retryWrites=true&w=majority&appName=SpaCluster
        echo.
        echo # Security
        echo JWT_SECRET=A_STRONG_SECRET_KEY_HERE
        echo.
        echo # Server
        echo PORT=5001
        echo NODE_ENV=production
        echo.
        echo # Email ^(for form notifications^)
        echo EMAIL_USER=info@monerispaacademy.in
        echo EMAIL_PASS=Info23456.
        echo NOTIFICATION_EMAIL=info@monerispaacademy.in
        echo.
        echo # CORS ^(production^)
        echo ALLOWED_ORIGINS=https://monerispaacademy.in,https://www.monerispaacademy.in
    ) > ..\server\.env
    echo [WARNING] Please update server\.env with your production values
)

REM Create client .env if it doesn't exist
if not exist ".env" (
    echo [WARNING] Creating client .env file.
    (
        echo # API Configuration
        echo REACT_APP_API_URL=https://monerispaacademy.in/api
        echo REACT_APP_BASE_URL=https://monerispaacademy.in
        echo.
        echo # Environment
        echo NODE_ENV=production
    ) > .env
    echo [SUCCESS] Client .env created
)

echo [INFO] Deployment preparation complete!

echo.
echo 📋 Next Steps:
echo 1. Update server\.env with your production database and email credentials
echo 2. Set up SSL certificates for HTTPS
echo 3. Configure your web server ^(Nginx/Apache^) to serve the built files
echo 4. Set up process management ^(PM2^) for the Node.js server
echo 5. Configure your domain DNS to point to your server
echo.
echo 🔧 Production Commands:
echo   Server: cd server ^&^& npm run prod
echo   Client: Built files are in client\build\
echo.
echo 🌐 Domain: monerispaacademy.in
echo 📧 Admin Email: info@monerispaacademy.in
echo.
echo [SUCCESS] Deployment script completed successfully!
pause
