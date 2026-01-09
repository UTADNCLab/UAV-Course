@echo off
color 0A
echo ========================================
echo    PUSH TO GITHUB
echo ========================================
echo.

echo Did you create the repository on GitHub?
echo (Go to https://github.com/new if not)
echo.
pause

echo.
set /p username="Enter your GitHub username: "

echo.
echo ========================================
echo Connecting to GitHub...
echo ========================================
echo.

git remote add origin https://github.com/%username%/uav-course.git 2>nul

if errorlevel 1 (
    echo Remote already exists, updating...
    git remote set-url origin https://github.com/%username%/uav-course.git
)

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo ========================================
echo Pushing to GitHub...
echo ========================================
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo.
    echo Possible reasons:
    echo 1. Repository doesn't exist on GitHub
    echo 2. Wrong username
    echo 3. Need to authenticate
    echo.
    echo Please check and try again.
    echo.
    pause
    exit
)

echo.
echo ========================================
echo SUCCESS! Your course is on GitHub!
echo ========================================
echo.
echo Your repository: https://github.com/%username%/uav-course
echo.
echo FINAL STEP - Enable GitHub Pages:
echo.
echo 1. Go to: https://github.com/%username%/uav-course
echo 2. Click "Settings" tab
echo 3. Click "Pages" in left sidebar
echo 4. Under "Source", select "main" branch
echo 5. Click "Save"
echo 6. Wait 2-3 minutes
echo.
echo Your live site will be at:
echo https://%username%.github.io/uav-course/landing.html
echo.
echo Press any key to open your repository...
pause > nul

start https://github.com/%username%/uav-course

echo.
echo Remember to enable GitHub Pages in Settings!
echo.
pause
