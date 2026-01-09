@echo off
color 0A
echo ========================================
echo    UAV COURSE - GITHUB SETUP
echo ========================================
echo.

echo Select your email:
echo.
echo 1. Use: 2810j@example.com
echo 2. Use: jay@example.com
echo 3. Use: your.email@gmail.com
echo 4. Enter custom email
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    set email=2810j@example.com
    set name=Jay
) else if "%choice%"=="2" (
    set email=jay@example.com
    set name=Jay
) else if "%choice%"=="3" (
    set email=your.email@gmail.com
    set name=Jay
) else if "%choice%"=="4" (
    set /p email="Enter your email: "
    set /p name="Enter your name: "
) else (
    echo Invalid choice!
    pause
    exit
)

echo.
echo ========================================
echo Configuring Git...
echo ========================================
echo Email: %email%
echo Name: %name%
echo.

git config --global user.email "%email%"
git config --global user.name "%name%"

echo.
echo Git configured successfully!
echo.

echo ========================================
echo Committing files...
echo ========================================
echo.

git commit -m "Initial commit - UAV Course Platform"

echo.
echo ========================================
echo SUCCESS! Files are ready!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: uav-course
echo 3. Make it PUBLIC
echo 4. Click "Create repository"
echo 5. Come back and run: PUSH-TO-GITHUB.bat
echo.
echo Press any key to open GitHub in browser...
pause > nul

start https://github.com/new

echo.
echo After creating repository, run: PUSH-TO-GITHUB.bat
echo.
pause
