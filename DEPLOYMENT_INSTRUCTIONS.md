# 🚀 Deployment Instructions - Updated Backend

## What Was Changed

### ✅ Completed Updates:

1. **Landing Page**
   - Removed "Hello!" emoji from hero section
   - Course title now prominently displayed
   - Simplified info boxes with bullet points
   - YouTube-style side-by-side layout (video left, modules right)

2. **Backend (Google Apps Script)**
   - Added 3 new columns: "Quiz Attempts", "Best Qualifying Scores", "Certificate Eligible"
   - Automatic removal of column highlighting (columns C and O)
   - Quiz attempts tracking (all attempts, not just latest)
   - 80%+ score filtering for certificate eligibility
   - Certificate only awarded when ALL 4 quizzes have at least one 80%+ score

3. **Course Page Layout**
   - Changed from horizontal top bar to YouTube-style sidebar
   - Video content on left, modules list on right (sticky)
   - Better user experience for navigation

## 🔧 How to Deploy the Backend Update

### Step 1: Open Google Apps Script
1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0
2. Click **Extensions** → **Apps Script**

### Step 2: Replace the Code
1. Delete ALL existing code in the script editor
2. Copy the ENTIRE contents of `backend/google-apps-script.js`
3. Paste it into the script editor
4. Click **Save** (💾 icon)

### Step 3: Deploy the Updated Version
1. Click **Deploy** → **Manage deployments**
2. Click the **Edit** (✏️) icon next to your existing deployment
3. Under "Version", select **New version**
4. Add description: "Added quiz attempts tracking and 80%+ filtering"
5. Click **Deploy**
6. Copy the new Web App URL (it should be the same as before)

### Step 4: Test the Backend
1. Open the Web App URL in a new browser tab
2. You should see: `{"status":"success","message":"UAV Course Backend is running!"}`
3. This confirms the backend is working

### Step 5: Remove Existing Column Highlighting (One-Time)
1. In the Apps Script editor, find the function `removeAllColumnHighlighting()`
2. Click on the function name
3. Click **Run** (▶️ button at the top)
4. Authorize the script if prompted
5. Check your spreadsheet - columns C and O should no longer be highlighted

### Step 6: Test with Real Data
1. Go to your course website: `index.html`
2. Login with your account
3. Complete a module or quiz
4. Check the Google Sheet - you should see:
   - Data updating in real-time
   - No blue highlighting on columns
   - New columns populated: "Quiz Attempts", "Best Qualifying Scores", "Certificate Eligible"

## 📊 New Spreadsheet Columns Explained

### Column P: Quiz Attempts
- Shows ALL quiz attempts with scores
- Format: `Q1: 85% | Q2: 90% | Q3: 75% | Q4: 88%`
- Tracks every attempt, not just the latest

### Column Q: Best Qualifying Scores
- Shows ONLY scores of 80% or higher
- Format: `Q1: 85% | Q2: 90% | Q4: 88%`
- Used for certificate calculation
- If a quiz has no 80%+ score, it won't appear here

### Column R: Certificate Eligible
- Shows "Yes" or "No"
- "Yes" = ALL 4 quizzes have at least one 80%+ score
- "No" = One or more quizzes don't have an 80%+ score
- Certificate is only generated when this shows "Yes"

## 🎯 How the 80%+ Filtering Works

### Example Scenario:
**Student takes quizzes multiple times:**
- Quiz 1: 75%, 85%, 90% → Best qualifying: 90%
- Quiz 2: 70%, 78% → No qualifying score (none above 80%)
- Quiz 3: 82% → Best qualifying: 82%
- Quiz 4: 95% → Best qualifying: 95%

**Result:**
- Quiz Attempts: `Q1: 75% | Q1: 85% | Q1: 90% | Q2: 70% | Q2: 78% | Q3: 82% | Q4: 95%`
- Best Qualifying Scores: `Q1: 90% | Q3: 82% | Q4: 95%`
- Certificate Eligible: **No** (Quiz 2 has no 80%+ score)

**After retaking Quiz 2 and getting 85%:**
- Best Qualifying Scores: `Q1: 90% | Q2: 85% | Q3: 82% | Q4: 95%`
- Certificate Eligible: **Yes** ✅

## 🐛 Troubleshooting

### Issue: Data not updating in spreadsheet
**Solution:**
1. Check the Web App URL in `js/auth.js` (line 11)
2. Make sure it matches your deployed Web App URL
3. Redeploy the Apps Script with a new version
4. Clear browser cache and try again

### Issue: Column highlighting still visible
**Solution:**
1. Run the `removeAllColumnHighlighting()` function manually
2. Or manually select columns C and O, right-click → Clear formatting

### Issue: Certificate not showing even with 80%+ scores
**Solution:**
1. Check the "Certificate Eligible" column in spreadsheet
2. Make sure ALL 4 quizzes show in "Best Qualifying Scores"
3. Refresh the course page and check again

### Issue: Welcome message not showing on login
**Solution:**
- The welcome message is in `data/course-data.json`
- It shows automatically when you first login
- Check browser console for any JavaScript errors

## 📝 Testing Checklist

- [ ] Backend deployed successfully
- [ ] Web App URL returns success message
- [ ] Column highlighting removed from spreadsheet
- [ ] Login and check data appears in spreadsheet
- [ ] Complete a module and verify progress updates
- [ ] Take a quiz and verify score is recorded
- [ ] Check new columns are populated correctly
- [ ] Take same quiz again with different score
- [ ] Verify both attempts are tracked
- [ ] Get 80%+ on all quizzes and verify certificate eligibility

## 🎉 What's Next

The backend is now ready to:
1. Track all quiz attempts (not just latest)
2. Filter scores for certificate (80%+ only)
3. Automatically determine certificate eligibility
4. Remove column highlighting automatically
5. Provide better data for analysis

All changes are committed to Git and ready for deployment!
