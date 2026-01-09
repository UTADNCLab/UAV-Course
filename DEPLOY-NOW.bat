@echo off
color 0A
echo ========================================
echo    UAV COURSE - ONE-CLICK DEPLOY
echo ========================================
echo.
echo GitHub Username: jaymehta12110
echo Repository: uav-course
echo.
echo This will:
echo 1. Configure Git
echo 2. Commit your files
echo 3. Create repository (you'll do this manually)
echo 4. Push to GitHub
echo.
echo Press any key to start...
pause > nul

echo.
echo ========================================
echo Step 1: Configuring Git...
echo ========================================
echo.

git config --global user.email "jaymehta12110@gmail.com"
git config --global user.name "Jay Mehta"

echo Git configured!

echo.
echo ========================================
echo Step 2: Committing files...
echo ========================================
echo.

git commit -m "Initial commit - UAV Course Platform"

echo Files committed!

echo.
echo ========================================
echo Step 3: Create GitHub Repository
echo ========================================
echo.
echo Opening GitHub in browser...
echo.
echo On the page that opens:
echo 1. Repository name: uav-course
echo 2. Make it PUBLIC
echo 3. Click "Create repository"
echo.
echo Press any key to open GitHub...
pause > nul

start https://github.com/new

echo.
echo After creating the repository, press any key to continue...
pause > nul

echo.
echo ========================================
echo Step 4: Pushing to GitHub...
echo ========================================
echo.

git remote add origin https://github.com/jaymehta12110/uav-course.git 2>nul
git remote set-url origin https://github.com/jaymehta12110/uav-course.git
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo Push failed! Trying alternative method...
    echo ========================================
    echo.
    git push --set-upstream origin main --force
)

echo.
echo ========================================
echo SUCCESS! Your course is on GitHub!
echo ========================================
echo.
echo Repository: https://github.com/jaymehta12110/uav-course
echo.
echo FINAL STEP: Enable GitHub Pages
echo.
echo Opening repository settings...
echo.
pause

start https://github.com/jaymehta12110/uav-course/settings/pages

echo.
echo ========================================
echo On the page that opened:
echo ========================================
echo.
echo 1. Under "Source", select "main" branch
echo 2. Click "Save"
echo 3. Wait 2-3 minutes
echo.
echo Your live site will be at:
echo https://jaymehta12110.github.io/uav-course/landing.html
echo.
echo ========================================
echo DONE! Share this URL with your students:
echo https://jaymehta12110.github.io/uav-course/landing.html
echo ========================================
echo.
pause
