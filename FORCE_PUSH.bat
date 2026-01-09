@echo off
echo ========================================
echo   FORCING GIT PUSH
echo ========================================
echo.
echo This will push your changes to GitHub.
echo Please wait, this may take 5-10 minutes...
echo.
pause

cd /d "%~dp0"

echo.
echo Step 1: Adding new files...
git add -A

echo.
echo Step 2: Committing new guide files...
git commit -m "Added push and video upload guides"

echo.
echo Step 3: Pushing to GitHub (this may take a while)...
echo Please be patient and DO NOT close this window!
echo.

git push origin main --progress

echo.
echo ========================================
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS! Changes pushed to GitHub!
    echo.
    echo Your website will update in 2-3 minutes at:
    echo https://jaymehta12110.github.io/UAV-Course/
) else (
    echo FAILED! Error code: %ERRORLEVEL%
    echo.
    echo Please try:
    echo 1. Check your internet connection
    echo 2. Make sure you're logged into GitHub
    echo 3. Try running this script again
)
echo ========================================
echo.
pause
