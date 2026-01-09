# How to Push Changes Using GitHub Desktop

## Quick Steps:

1. **Open GitHub Desktop**
   - Find it in your Start Menu
   - Or search for "GitHub Desktop" in Windows search

2. **Open Your Repository**
   - Click "File" → "Add Local Repository"
   - Browse to: `C:\Users\2810j\OneDrive\Desktop\course`
   - Click "Add Repository"

3. **You Should See:**
   - 3 commits ready to push
   - The commits are:
     - "Fixed video hosting - removed large files, added Google Drive placeholders and setup guide"
     - "Added local video files and updated course-data.json to use them"
     - "CRITICAL FIX: Fixed sendProgressUpdate to read quiz scores from correct localStorage key"

4. **Push to GitHub:**
   - Click the blue "Push origin" button at the top
   - Wait for it to complete (may take 2-5 minutes due to large file removal)

5. **Verify:**
   - Once done, go to: https://github.com/jaymehta12110/uav-course
   - Check if the latest commit shows up
   - Your site will auto-deploy in 2-3 minutes

## Alternative: Manual Push (If GitHub Desktop doesn't work)

If GitHub Desktop isn't working, you can:

1. **Open a NEW PowerShell window** (close the current one)
2. **Navigate to your project:**
   ```
   cd C:\Users\2810j\OneDrive\Desktop\course
   ```
3. **Try pushing again:**
   ```
   git push origin main
   ```
4. **If it asks for credentials:**
   - Username: jaymehta12110
   - Password: Use your GitHub Personal Access Token (not your regular password)

## Need Help?

If you're still stuck, let me know and I can:
- Create a fresh repository
- Try a different push method
- Help troubleshoot the issue
