# 🚁 UAV Computing & Networking Course Platform

A professional, interactive online course platform with authentication, progress tracking, and Google Sheets backend integration.

## 🌐 Live Site

**Course Website:** https://jaymehta12110.github.io/UAV-Course/

## ✨ Key Features

### 🔐 User Authentication
- User registration and login system
- Password hashing for security
- Session management
- Google Sheets backend for user data

### 🎥 Video Learning
- Auto-pause when switching modules
- Progress tracking per video
- Module descriptions and metadata

### 📝 Interactive Quizzes
- Multiple choice questions
- Instant feedback with explanations
- Pass/fail system (80% required)
- Score tracking and analytics

### 📊 Progress Tracking
- Real-time progress synchronization
- Google Sheets backend storage
- Visual progress indicators
- Module completion tracking

### 🏆 Certificate Generation
- Automatic certificate upon completion
- Personalized with student name
- Selective module certificate
- Downloadable as pdf

### 📱 Responsive Design
- Mobile-friendly interface
- Works on all devices

## 🚀 Quick Start

### For Students

1. Visit: https://jaymehta12110.github.io/UAV-Course/
2. Click "Login" or "Register"
3. Create an account or login
4. Start learning!

### For Administrators

**Admin Tools:**
- `admin-password-reset.html` - Reset user passwords
- `clear-cache.html` - Clear browser cache/logout
- `SYSTEM_RESET_GUIDE.md` - Complete reset instructions

## 📁 Project Structure

```
course/
├── index.html              # Landing page
├── course.html             # Main course interface
├── css/
│   ├── styles.css         # Course page styles
│   └── landing-styles.css # Landing page styles
├── js/
│   ├── auth.js            # Authentication system
│   ├── course.js          # Course logic
│   ├── quiz.js            # Quiz functionality
│   ├── certificate.js     # Certificate generation
│   └── contact.js         # Contact form
├── data/
│   └── course-data.json   # Course content
├── backend/
│   └── google-apps-script.js  # Backend API
├── admin-password-reset.html  # Admin tool
├── clear-cache.html           # Cache clearing tool
├── SYSTEM_RESET_GUIDE.md      # Reset instructions
└── README.md                  # This file
```

## 🔧 System Administration

### Reset User Password

1. Open `admin-password-reset.html`
2. Enter user email
3. Enter new password
4. Click "Reset Password"

### Clear User Cache

Users can clear their local cache:
1. Open `clear-cache.html`
2. Click "Clear All Data"
3. User will be logged out
4. Can login again to restore progress from backend

### Complete System Reset

See `SYSTEM_RESET_GUIDE.md` for detailed instructions on:
- Clearing all users from backend
- Resetting browser cache
- Starting fresh with same URLs
- Preventing auto-login

## 🎓 Course Content Management

### Editing Course Content

All content is in `data/course-data.json`:

```json
{
  "course": {
    "title": "Your Course Title",
    "description": "Course description..."
  },
  "modules": [
    {
      "id": 1,
      "title": "Module Title",
      "videoUrl": "https://www.youtube.com/embed/VIDEO_ID",
      "type": "video"
    }
  ]
}
```

### Adding Quiz Questions

```json
{
  "type": "quiz",
  "questions": [
    {
      "question": "Your question?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "explanation": "Why this is correct..."
    }
  ]
}
```

## 🔗 Backend Integration

### Google Sheets Setup

The course uses Google Sheets as a database:

**Spreadsheet ID:** `1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc`

**Sheets:**
- `Users` - User accounts
- `Progress` - User progress data

### Web App URL

Backend API: `https://script.google.com/macros/s/AKfycbxz-4ZhhhuSxBWs8cZ5NMnBlHf-Q_PdYwhxWjQOizXSP69U9l4EqkJYWWu7YMQctXUkTw/exec`

### Updating Backend

1. Open Google Apps Script
2. Copy code from `backend/google-apps-script.js`
3. Deploy as Web App
4. Update URL in `js/auth.js` if changed

## 🎨 Customization

### Changing Colors

Edit `css/styles.css` or `css/landing-styles.css`:

```css
:root {
    --primary-color: #0064A4;
    --accent-color: #F47E3C;
    --success-color: #28a745;
}
```

### Changing Fonts

```css
body {
    font-family: 'Your Font', sans-serif;
}
```

## 🌐 Deployment

### Current Deployment

- **Platform:** GitHub Pages
- **Repository:** jaymehta12110/UAV-Course
- **URL:** https://jaymehta12110.github.io/UAV-Course/

### Deploying Updates

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Changes go live automatically in 1-2 minutes.

## 🔒 Security Features

- ✅ Password hashing (SHA-256)
- ✅ Secure session management
- ✅ Backend data validation
- ✅ HTTPS encryption (via GitHub Pages)
- ✅ No passwords stored in frontend


## 🐛 Troubleshooting

### Video Keeps Playing in Background

**Fixed!** Videos now auto-pause when switching to quizzes or other modules.


## 📄 Important Files

**Keep These:**
- `README.md` - Main documentation
- `HOW-TO-RUN.md` - Setup instructions
- `SYSTEM_RESET_GUIDE.md` - Reset procedures
- `Quiz_2.md`, `Quiz_3.md`, `Quiz_4.md` - Quiz content

**Admin Tools:**
- `admin-password-reset.html` - Password management
- `clear-cache.html` - Cache management
- `cleanup-docs.bat` - Documentation cleanup script

## 🎯 Future Enhancements

Potential improvements:
- Email verification
- Password recovery via email
- Advanced analytics dashboard
- Course completion certificates via email
- Multi-language support

Educational use. 

## 🎓 Credits

**Course Content:** UAV Design & Cyber-Physical Systems
**Platform:** Custom-built with HTML, CSS, JavaScript
**Backend:** Google Apps Script + Google Sheets
**Hosting:** GitHub Pages

---

**For detailed reset instructions, see:** `SYSTEM_RESET_GUIDE.md`

**For admin tools, use:** `admin-password-reset.html` or `clear-cache.html`

**Live Site:** https://jaymehta12110.github.io/UAV-Course/
