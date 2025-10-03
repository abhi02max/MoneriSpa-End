@echo off
echo 🚀 Deploying Updated Consultation Forms...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Not in project root directory
    exit /b 1
)

REM Add all changes
echo 📝 Adding changes to Git...
git add .

REM Commit changes
echo 💾 Committing form updates...
git commit -m "Update consultation forms with comprehensive fields

- Hair Test Form: Added detailed client info, hair concerns, history, lifestyle, and goals
- Skin Test Form: Added skin type, concerns, medical history, and current routine
- Both forms now include 6-step and 5-step processes respectively
- Added declaration checkboxes for form submission
- Enhanced form validation and user experience"

REM Push to GitHub
echo 📤 Pushing to GitHub...
git push origin main

echo ✅ Forms update deployed successfully!
echo.
echo 📋 Next steps:
echo 1. SSH to your server: ssh your-username@your-server-ip
echo 2. Navigate to project: cd /root/monerispa-live
echo 3. Pull latest changes: git pull origin main
echo 4. Restart PM2: pm2 restart all
echo 5. Test the forms on your live site
echo.
echo 🎉 Your consultation forms are now updated with comprehensive fields!
pause
