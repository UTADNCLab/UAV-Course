@echo off
echo ========================================
echo Git Configuration Setup
echo ========================================
echo.

set /p email="Enter your email address: "
set /p name="Enter your name: "

echo.
echo Configuring Git...
git config --global user.email "%email%"
git config --global user.name "%name%"

echo.
echo ========================================
echo Git configured successfully!
echo ========================================
echo.
echo Email: %email%
echo Name: %name%
echo.

echo Now committing your files...
git commit -m "Initial commit - UAV Course Platform"

echo.
echo ========================================
echo Files committed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Go to https://github.com/new
echo 2. Create a repository named: uav-course
echo 3. Make it PUBLIC
echo 4. Click "Create repository"
echo 5. Come back here and run: push-to-github.bat
echo.
pause
