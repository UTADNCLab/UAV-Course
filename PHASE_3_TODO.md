# Phase 3: Backend & Quiz Scoring Implementation

## Completed ✅
1. Landing page: Added course title to hero section
2. Info boxes: Simplified to smaller bullet-point style
3. Course page layout: Changed to YouTube-style side-by-side (video left, modules right)
4. Instructor section: Already removed from course page (index.html)

## Remaining Tasks 🔧

### 1. Google Sheets Backend Fixes
**Issues to fix:**
- Remove highlighted columns (C and O are highlighted in blue)
- Fix data not updating when course progress is made
- Implement proper progress tracking

**Files to modify:**
- `backend/google-apps-script.js` - Update the Apps Script code
- `js/auth.js` - Fix the sendProgressUpdate function
- `js/progress.js` - Ensure progress is being sent correctly

**Steps:**
1. Review current Google Apps Script implementation
2. Fix the doPost function to properly handle progress updates
3. Remove any column highlighting/formatting code
4. Test data flow from frontend to spreadsheet

### 2. Quiz Scoring & Attempts Tracking
**Requirements:**
- Track ALL quiz attempts (not just latest)
- Only count attempts with 80%+ scores for certificate
- Add new "Attempts" column at the end of spreadsheet
- Show best qualifying attempt (80%+) for certificate calculation

**Implementation needed:**
1. **Backend (google-apps-script.js):**
   - Add new column for tracking attempts
   - Store quiz attempts as array/list
   - Calculate best score from 80%+ attempts only
   - Update certificate logic to use qualifying scores only

2. **Frontend (js/quiz.js):**
   - Send all quiz attempts to backend
   - Include attempt number and timestamp
   - Display user's best qualifying score

3. **Spreadsheet Structure:**
   - Add "Quiz Attempts" column
   - Format: "Q1: 85%(1), 90%(2) | Q2: 75%(1), 80%(2)"
   - Add "Best Qualifying Scores" column
   - Only show 80%+ scores for certificate

### 3. Certificate Generation Logic
**Requirements:**
- Only generate certificate if ALL quizzes have at least one 80%+ attempt
- Use best qualifying score from each quiz
- Display on congratulations modal

**Files to modify:**
- `js/course.js` - Update showCongratsModal logic
- `js/quiz.js` - Track qualifying scores
- `backend/google-apps-script.js` - Certificate eligibility check

### 4. Testing Checklist
- [ ] Complete a quiz with <80% score - should NOT count for certificate
- [ ] Retake same quiz with 80%+ score - should count for certificate
- [ ] Complete all quizzes with 80%+ - should show certificate option
- [ ] Verify spreadsheet shows all attempts
- [ ] Verify spreadsheet only uses 80%+ for certificate calculation
- [ ] Check that progress updates in real-time
- [ ] Verify no duplicate entries in spreadsheet

## Technical Notes

### Current Spreadsheet Columns:
1. Email
2. Name
3. Event Type (highlighted - needs removal)
4. Completion %
5. Completed Modules
6. Total Modules
7. Quizzes Taken
8. Average Quiz Score
9. Quiz 1 Score
10. Quiz 2 Score
11. Quiz 3 Score
12. Quiz 4 Score
13. Time Spent (sec)
14. Last Updated
15. Timestamp (highlighted - needs removal)

### Proposed New Columns:
16. Quiz Attempts (detailed log)
17. Best Qualifying Scores (80%+ only)
18. Certificate Eligible (Yes/No)

### Data Flow:
```
User completes quiz → 
js/quiz.js sends attempt data → 
js/auth.js sendProgressUpdate() → 
Google Apps Script doPost() → 
Update spreadsheet with attempt → 
Calculate best qualifying scores → 
Update certificate eligibility
```

## Priority Order:
1. **HIGH**: Fix data not updating in spreadsheet
2. **HIGH**: Remove column highlighting
3. **MEDIUM**: Implement attempts tracking
4. **MEDIUM**: Add 80%+ filtering for certificate
5. **LOW**: Polish certificate generation UI

## Next Steps:
1. Read and analyze current backend code
2. Identify why data isn't updating
3. Fix the update mechanism
4. Implement attempts tracking
5. Add 80%+ score filtering
6. Test thoroughly
