# 🔐 Backend Setup Guide - User Authentication & Progress Tracking

This guide shows you how to set up user login and track student progress in Google Sheets.

## 📊 What You'll Get:

- ✅ Email-based user registration and login
- ✅ Student progress tracking in Google Sheets
- ✅ Quiz scores automatically recorded
- ✅ Completion percentage tracking
- ✅ Time spent tracking
- ✅ Downloadable spreadsheet with all student data

---

## 🚀 Quick Setup (15 minutes)

### Step 1: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click "Blank" to create a new spreadsheet
3. Name it: "UAV Course - Student Data"
4. Copy the Spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit

   18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0
   ```
   Save this ID - you'll need it later!

---

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy ALL the code from `backend/google-apps-script.js`
4. Paste it into the Apps Script editor
5. **Replace** `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID (from Step 1)
6. Click **Save** (💾 icon)
7. Name the project: "UAV Course Backend"

---

### Step 3: Deploy as Web App

1. In Apps Script, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description:** UAV Course Backend
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to UAV Course Backend (unsafe)**
9. Click **Allow**
10. **Copy the Web App URL** - it looks like:
    ```
    https://script.google.com/macros/s/LONG_ID_HERE/exec
    ```
    Your Web App URL:
    ```
    https://script.google.com/macros/s/AKfycbzs7oApM-gF5Eb_AaGHPxaFSeyzXhfcuGPWLzyOyEalyXKgiVkHkPqXwZASGjmOGe8w/exec
    ```
---

### Step 4: Update Course Files

#### A. Update auth.js

1. Open `course/js/auth.js`
2. Find this section (around line 10):
   ```javascript
   const GOOGLE_SHEETS_CONFIG = {
       WEB_APP_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
       SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID_HERE'
   };
   ```
3. Replace with your actual values (ALREADY UPDATED):
   ```javascript
   const GOOGLE_SHEETS_CONFIG = {
       WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbzs7oApM-gF5Eb_AaGHPxaFSeyzXhfcuGPWLzyOyEalyXKgiVkHkPqXwZASGjmOGe8w/exec',
       SPREADSHEET_ID: '18YsuCvF3w6wUm1XL24eST1SMUh4WVBeR3nAvsXDdhB0'
   };
   ```
4. Save the file

#### B. Update index.html

1. Open `course/index.html`
2. Find the line with `<script src="js/progress.js"></script>` (near the end)
3. Add this line BEFORE it:
   ```html
   <script src="js/auth.js"></script>
   ```
4. Save the file

#### C. Update landing.html

1. Open `course/landing.html`
2. Add this line before the closing `</body>` tag:
   ```html
   <script src="js/auth.js"></script>
   ```
3. Save the file

---

### Step 5: Add Login UI to Header

Open `course/index.html` and find the header section (around line 40).

**Replace this:**
```html
<header class="header">
    <div class="container">
        <div class="header-content">
            <h1><i class="fas fa-drone"></i> UAV Design Course</h1>
            <div class="header-progress">
                <span class="progress-text">Course Progress: <strong id="headerProgressText">0%</strong></span>
                <div class="progress-bar-small">
                    <div class="progress-fill-small" id="headerProgressBar"></div>
                </div>
            </div>
        </div>
    </div>
</header>
```

**With this:**
```html
<header class="header">
    <div class="container">
        <div class="header-content">
            <h1><i class="fas fa-drone"></i> UAV Design Course</h1>
            <div class="header-progress">
                <span class="progress-text">Course Progress: <strong id="headerProgressText">0%</strong></span>
                <div class="progress-bar-small">
                    <div class="progress-fill-small" id="headerProgressBar"></div>
                </div>
            </div>
            <!-- Auth Section -->
            <div class="header-auth">
                <button id="authButton" class="btn btn-primary" onclick="showAuthModal()">
                    <i class="fas fa-user"></i> Login / Register
                </button>
                <div id="userInfo" class="user-info" style="display: none;"></div>
            </div>
        </div>
    </div>
</header>
```

---

### Step 6: Add Auth Modal to HTML

Add this code BEFORE the closing `</body>` tag in `index.html`:

```html
<!-- Auth Modal -->
<div id="authModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2><i class="fas fa-user-circle"></i> Welcome!</h2>
            <button class="modal-close" onclick="closeAuthModal()">×</button>
        </div>
        
        <!-- Login Form -->
        <div id="loginForm" class="auth-form">
            <h3>Login to Your Account</h3>
            <form onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="loginEmail" required placeholder="your@email.com">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> Password</label>
                    <input type="password" id="loginPassword" required placeholder="Enter password">
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
            </form>
            <p class="auth-switch">
                Don't have an account? <a href="#" id="showRegister">Register here</a>
            </p>
        </div>
        
        <!-- Register Form -->
        <div id="registerForm" class="auth-form" style="display: none;">
            <h3>Create Your Account</h3>
            <form onsubmit="handleRegister(event)">
                <div class="form-group">
                    <label><i class="fas fa-user"></i> Full Name</label>
                    <input type="text" id="registerName" required placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="registerEmail" required placeholder="your@email.com">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-lock"></i> Password</label>
                    <input type="password" id="registerPassword" required placeholder="Create password" minlength="6">
                </div>
                <button type="submit" class="btn btn-primary btn-block">
                    <i class="fas fa-user-plus"></i> Register
                </button>
            </form>
            <p class="auth-switch">
                Already have an account? <a href="#" id="showLogin">Login here</a>
            </p>
        </div>
    </div>
</div>
```

---

### Step 7: Add Auth Styles to CSS

Add this to the end of `course/css/styles.css`:

```css
/* ===================================
   AUTHENTICATION STYLES
   =================================== */
.header-auth {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
}

.user-avatar {
    font-size: 2rem;
    color: white;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: 600;
    font-size: 0.9rem;
}

.user-email {
    font-size: 0.75rem;
    opacity: 0.8;
}

.btn-logout {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
}

.btn-logout:hover {
    background: rgba(255, 255, 255, 0.3);
}

.auth-form {
    padding: 2rem;
}

.auth-form h3 {
    margin-bottom: 1.5rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--text-primary);
}

.form-group label i {
    margin-right: 0.5rem;
    color: var(--primary-color);
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.btn-block {
    width: 100%;
    justify-content: center;
}

.auth-switch {
    text-align: center;
    margin-top: 1.5rem;
    color: var(--text-secondary);
}

.auth-switch a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
}

.auth-switch a:hover {
    text-decoration: underline;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: white;
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.modal-close:hover {
    opacity: 1;
}
```

---

## 📊 What Gets Tracked in Google Sheets:

### Sheet 1: Users
- Name
- Email
- Registered Date
- Last Login
- Status

### Sheet 2: Progress (Main Data)
- Email
- Name
- Event Type (login, progress, quiz_complete, etc.)
- Completion %
- Completed Modules
- Total Modules
- Quizzes Taken
- Average Quiz Score
- Quiz 1 Score
- Quiz 2 Score
- Quiz 3 Score
- Quiz 4 Score
- Time Spent (seconds)
- Last Updated
- Timestamp

### Sheet 3: Activity Log (History)
- Timestamp
- Email
- Name
- Event Type
- Completion %
- Quiz Score
- Details (JSON)

---

## 📥 How to Download Student Data:

### Option 1: Download from Google Sheets
1. Open your Google Sheet
2. Click **File** → **Download** → **Microsoft Excel (.xlsx)**
3. Or **Comma Separated Values (.csv)**

### Option 2: Use Apps Script
1. In Apps Script, add this function:
   ```javascript
   function downloadData() {
     const csv = exportProgressToCSV();
     Logger.log(csv);
   }
   ```
2. Run it to see the CSV in logs

---

## 🔒 Security Notes:

1. **Password Storage:** Currently uses simple hashing (for demo). For production, use proper authentication services like Firebase Auth or Auth0.

2. **Data Privacy:** Student data is stored in YOUR Google Sheet - you have full control.

3. **Access Control:** Only you can access the Google Sheet. Students can only submit their own data.

4. **HTTPS:** When deployed online, always use HTTPS.

---

## 🧪 Testing the System:

### Test Registration:
1. Open the course
2. Click "Login / Register"
3. Click "Register here"
4. Fill in:
   - Name: Test Student
   - Email: test@example.com
   - Password: test123
5. Click Register
6. Check your Google Sheet - new user should appear!

### Test Progress Tracking:
1. Complete a module
2. Take a quiz
3. Check Google Sheet "Progress" tab
4. Your progress should be recorded!

---

## 📊 Viewing Student Progress:

### In Google Sheets:
1. Open your spreadsheet
2. Go to "Progress" tab
3. See all students' data in real-time
4. Sort by completion %, quiz scores, etc.

### Create Charts:
1. Select data range
2. Click **Insert** → **Chart**
3. Choose chart type (bar, pie, line)
4. Visualize student progress!

---

## 🔄 Auto-Updates:

Progress is automatically sent to Google Sheets:
- ✅ Every 5 minutes (while course is open)
- ✅ When a module is completed
- ✅ When a quiz is completed
- ✅ When user logs out
- ✅ Before page closes

---

## 🆘 Troubleshooting:

### "Failed to send data"
- Check if Web App URL is correct in `auth.js`
- Verify Apps Script is deployed as "Anyone" can access
- Check browser console (F12) for errors

### "User already exists"
- This is normal - user tried to register twice
- They should use "Login" instead

### Data not appearing in Sheet
- Wait a few seconds (can take 5-10 seconds)
- Refresh the Google Sheet
- Check Apps Script logs for errors

### CORS Errors
- This is normal with `mode: 'no-cors'`
- Data is still being sent successfully
- Check Google Sheet to confirm

---

## 🎯 Next Steps:

1. ✅ Complete all setup steps above
2. ✅ Test registration and login
3. ✅ Complete a module and check if it's tracked
4. ✅ Take a quiz and verify score is recorded
5. ✅ Download the spreadsheet to see all data

---

## 📧 Example: Viewing Student Data

Your Google Sheet will look like this:

**Progress Tab:**
| Email | Name | Completion % | Quiz 1 | Quiz 2 | Quiz 3 | Quiz 4 | Avg Score |
|-------|------|--------------|--------|--------|--------|--------|-----------|
| student1@email.com | John Doe | 100% | 87% | 92% | 85% | 90% | 88.5% |
| student2@email.com | Jane Smith | 75% | 95% | 88% | 92% | Not taken | 91.7% |

You can:
- Sort by completion %
- Filter by quiz scores
- Export to Excel
- Create charts
- Share with administrators

---

**Your backend is ready! Students can now register, login, and their progress will be tracked automatically! 🎉**
