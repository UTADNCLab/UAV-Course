@echo off
echo ========================================
echo Cleaning up unnecessary documentation files
echo ========================================
echo.

REM Keep these important files:
REM - README.md (main documentation)
REM - HOW-TO-RUN.md (setup instructions)
REM - SYSTEM_RESET_GUIDE.md (reset instructions)
REM - Quiz files (Quiz_2.md, Quiz_3.md, Quiz_4.md)

REM Delete all other .md files
echo Removing unnecessary .md files...

del /F "ACTUAL_EMAIL_PERMISSION_STEPS.md" 2>nul
del /F "AUTH_FIX_COMPLETE_SUMMARY.md" 2>nul
del /F "BACKEND_SETUP.md" 2>nul
del /F "BACKEND_SYNC_EXPLAINED.md" 2>nul
del /F "CHECK_PERMISSIONS_WITHOUT_CODE.md" 2>nul
del /F "CLEAN_START_GUIDE.md" 2>nul
del /F "COMPLETE_FIX_SUMMARY.md" 2>nul
del /F "CUSTOM_DOMAIN_SETUP.md" 2>nul
del /F "DEPLOY_BACKEND_NOW.md" 2>nul
del /F "DEPLOY_HIDE_SCORES_SIMPLE.md" 2>nul
del /F "DEPLOY_UPDATED_BACKEND.md" 2>nul
del /F "EMAIL_FLOW_EXPLAINED.md" 2>nul
del /F "EMAIL_SYSTEM_DEPLOYMENT.md" 2>nul
del /F "ENABLE_PASSWORD_RESET_EMAILS.md" 2>nul
del /F "FINAL_AUTH_FIX_SUMMARY.md" 2>nul
del /F "FINAL_COMPLETE_FIX.md" 2>nul
del /F "FIND_PROGRESS_TAB.md" 2>nul
del /F "FIX_AUTH_TODO.md" 2>nul
del /F "FIX_CONSOLE_ERRORS.md" 2>nul
del /F "FIX_EMAIL_SENDING.md" 2>nul
del /F "FIX_LOGIN_AND_EMAIL_ISSUES.md" 2>nul
del /F "FIX_PROGRESS_SHEET_NAMES.md" 2>nul
del /F "FIX_YAN_WAN_ISSUE.md" 2>nul
del /F "GET_CUSTOM_URL.md" 2>nul
del /F "GITHUB_SETUP.md" 2>nul
del /F "GOOGLE_SHEETS_SETUP.md" 2>nul
del /F "GRANT_EMAIL_PERMISSIONS.md" 2>nul
del /F "GRANT_PERMISSIONS_NOW.md" 2>nul
del /F "GRANT_PERMISSIONS_NOW_SIMPLE.md" 2>nul
del /F "HIDE_LOW_QUIZ_SCORES.md" 2>nul
del /F "HOW_TO_MIGRATE_USERS.md" 2>nul
del /F "HOW_TO_VERIFY_SPREADSHEET_UPDATE.md" 2>nul
del /F "HOW_TO_VIEW_PROGRESS_DATA.md" 2>nul
del /F "HOW_TO_VIEW_SCRIPT_PROPERTIES.md" 2>nul
del /F "PASSWORD_RECOVERY_COMPLETE.md" 2>nul
del /F "PASSWORD_RECOVERY_GUIDE.md" 2>nul
del /F "PERMISSION_POPUP_TROUBLESHOOTING.md" 2>nul
del /F "POPULATE_USERS_SHEET.md" 2>nul
del /F "PUSH_MIGRATION_TOOL.md" 2>nul
del /F "QUICK_DEPLOY_STEPS.md" 2>nul
del /F "QUICK_VIDEO_UPLOAD_GUIDE.md" 2>nul
del /F "RENAME_REPOSITORY.md" 2>nul
del /F "SHARING_GUIDE.md" 2>nul
del /F "SIMPLE_PERMISSION_GRANT.md" 2>nul
del /F "SYNC_EXISTING_USERS.md" 2>nul
del /F "TEST_BACKEND_DEPLOYMENT.md" 2>nul
del /F "TEST_EMAIL_NOW.md" 2>nul
del /F "URGENT-BACKEND-FIX.md" 2>nul
del /F "VIDEO_HOSTING_SOLUTION.md" 2>nul
del /F "VIDEO_PAUSE_FIX.md" 2>nul
del /F "VIDEO_UPLOAD_GUIDE.md" 2>nul
del /F "VISUAL_PERMISSION_CHECK.md" 2>nul
del /F "WHERE_TO_FIND_USER_DATA.md" 2>nul
del /F "WHY_THIS_HAPPENED.md" 2>nul

echo.
echo ========================================
echo Cleanup complete!
echo ========================================
echo.
echo Files kept:
echo - README.md
echo - HOW-TO-RUN.md
echo - SYSTEM_RESET_GUIDE.md
echo - Quiz_2.md, Quiz_3.md, Quiz_4.md
echo.
echo All other .md files have been removed.
echo.
pause
