@echo off
echo ========================================
echo   CREATING FRESH REPOSITORY
echo ========================================
echo.
echo This will create a completely fresh Git repository
echo and push everything cleanly to GitHub.
echo.
pause

cd /d "%~dp0"

echo.
echo Step 1: Removing old Git history...
rmdir /s /q .git

echo.
echo Step 2: Initializing fresh repository...
git init

echo.
echo Step 3: Adding all files...
git add -A

echo.
echo Step 4: Creating initial commit...
git commit -m "Complete UAV Course with all fixes"

echo.
echo Step 5: Adding GitHub remote...
git remote add origin https://github.com/jaymehta12110/UAV-Course.git

echo.
echo Step 6: Pushing to GitHub (force push to clean slate)...
git push -u origin main --force

echo.
echo ========================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Fresh repository created and pushed!
    echo.
    echo Your website will update in 2-3 minutes at:
    echo https://jaymehta12110.github.io/UAV-Course/
) else (
    echo FAILED! Error code: %ERRORLEVEL%
)
echo ========================================
echo.
pause
