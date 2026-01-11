# 📧 Complete Email Flow Explanation

## How the Professor Contact System Works

---

## 🎯 YES! Professor Emails are Stored in the Code

### Where Professor Emails are Stored:

**File:** `js/contact-new.js` (Lines 5-30)

```javascript
const PROFESSOR_CONTACTS = {
    'dr-yan-wan': {
        name: 'Dr. Yan Wan',
        title: 'Distinguished University Professor, Electrical Engineering',
        email: 'yan.wan@uta.edu',  // ← STORED HERE
        expertise: '...'
    },
    'dr-junfei-xie': {
        name: 'Dr. Junfei Xie',
        title: 'Professor, Department of Electrical and Computer Engineering',
        email: 'jxie4@sdsu.edu',  // ← STORED HERE
        expertise: '...'
    },
    'dr-kejie-lu': {
        name: 'Dr. Kejie Lu',
        title: 'IEEE Senior Member, Professor',
        email: 'kejie.lu@upr.edu',  // ← STORED HERE
        expertise: '...'
    },
    'dr-shengli-fu': {
        name: 'Dr. Shengli Fu',
        title: 'Professor, Department of Electrical Engineering',
        email: 'Shengli.Fu@unt.edu',  // ← STORED HERE
        expertise: '...'
    }
};
```

---

## 📨 Complete Flow: Student Clicks "Contact" Button

### Step 1: Student Clicks "Contact" on Dr. Yan Wan's Card

**On the webpage (course.html):**
```html
<button onclick="showContactFormWithProfessor('dr-yan-wan')">
    <i class="fas fa-envelope"></i> Contact
</button>
```

---

### Step 2: JavaScript Gets Professor Info from Storage

**In js/contact-new.js:**
```javascript
function showContactFormWithProfessor(professorKey) {
    // professorKey = 'dr-yan-wan'
    
    // Get professor info from PROFESSOR_CONTACTS object
    const professor = PROFESSOR_CONTACTS[professorKey];
    
    // professor now contains:
    // {
    //   name: 'Dr. Yan Wan',
    //   email: 'yan.wan@uta.edu',  ← THIS IS USED!
    //   title: '...',
    //   expertise: '...'
    // }
    
    // Show modal with professor info
    showContactForm(professorKey);
}
```

---

### Step 3: Modal Opens with Professor Info

**Student sees:**
```
┌─────────────────────────────────────┐
│  Contact Professor                  │
├─────────────────────────────────────┤
│  Dr. Yan Wan                        │
│  Distinguished University Professor │
│  Expertise: Cyber-physical systems...│
├─────────────────────────────────────┤
│  Subject: [input field]             │
│  Question: [textarea]               │
│  [Send Question]                    │
└─────────────────────────────────────┘
```

---

### Step 4: Student Fills Form and Clicks "Send Question"

**Student enters:**
- Subject: "Question about Module 1"
- Question: "Can you explain UAV control systems?"

---

### Step 5: JavaScript Sends Data to Google Apps Script

**In js/contact-new.js (handleContactSubmit function):**
```javascript
// Get professor info from storage
const professor = PROFESSOR_CONTACTS[professorKey];

// Create email data package
const emailData = {
    action: 'sendProfessorEmail',
    data: {
        studentName: 'John Doe',
        studentEmail: 'john@example.com',
        professorEmail: 'yan.wan@uta.edu',  // ← FROM STORAGE!
        professorName: 'Dr. Yan Wan',
        subject: 'Question about Module 1',
        question: 'Can you explain UAV control systems?'
    }
};

// Send to Google Apps Script
fetch(BACKEND_URL, {
    method: 'POST',
    body: JSON.stringify(emailData)
});
```

---

### Step 6: Google Apps Script Receives Request

**In backend/google-apps-script.js:**
```javascript
function doPost(e) {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;  // 'sendProfessorEmail'
    const data = payload.data;
    
    if (action === 'sendProfessorEmail') {
        return handleSendProfessorEmail(data);
    }
}
```

---

### Step 7: Google Apps Script Sends TWO Emails

**In backend/google-apps-script.js (handleSendProfessorEmail function):**

```javascript
function handleSendProfessorEmail(emailData) {
    // Extract data
    const professorEmail = emailData.professorEmail;  // 'yan.wan@uta.edu'
    const studentEmail = emailData.studentEmail;      // 'john@example.com'
    const subject = emailData.subject;
    const question = emailData.question;
    
    // EMAIL 1: Send to Professor
    MailApp.sendEmail({
        to: 'yan.wan@uta.edu',  // ← PROFESSOR GETS EMAIL!
        subject: '[UAV Course Question] Question about Module 1',
        body: 'Dear Dr. Yan Wan,\n\nStudent: John Doe...',
        replyTo: 'john@example.com'  // ← Professor can reply directly!
    });
    
    // EMAIL 2: Send Copy to Course Admin
    MailApp.sendEmail({
        to: 'opencourse.uav@gmail.com',  // ← YOU GET A COPY!
        subject: '[Copy] Question to Dr. Yan Wan: Question about Module 1',
        body: 'Dear Dr. Yan Wan,\n\nStudent: John Doe...',
        replyTo: 'john@example.com'
    });
}
```

---

### Step 8: Emails Arrive in Inboxes

**Dr. Yan Wan receives:**
```
To: yan.wan@uta.edu
From: opencourse.uav@gmail.com
Reply-To: john@example.com
Subject: [UAV Course Question] Question about Module 1

Dear Dr. Yan Wan,

You have received a question from a student in the UAV Course.

Student Name: John Doe
Student Email: john@example.com

Subject: Question about Module 1

Question:
Can you explain UAV control systems?

---
Sent via UAV Course Platform
12/20/2024, 6:00 PM
```

**You (opencourse.uav@gmail.com) receive:**
```
To: opencourse.uav@gmail.com
From: opencourse.uav@gmail.com
Reply-To: john@example.com
Subject: [Copy] Question to Dr. Yan Wan: Question about Module 1

[Same content as above]
```

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Student clicks "Contact" on Dr. Yan Wan's card          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. JavaScript reads professor email from PROFESSOR_CONTACTS │
│    email: 'yan.wan@uta.edu'                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Modal opens showing Dr. Yan Wan's info                   │
│    (name, title, expertise)                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Student fills in subject and question                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. JavaScript sends data to Google Apps Script              │
│    Including: yan.wan@uta.edu                               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Google Apps Script receives request                      │
│    Calls: handleSendProfessorEmail()                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. Google Apps Script sends TWO emails:                     │
│    ✉️  Email 1 → yan.wan@uta.edu (Professor)               │
│    ✉️  Email 2 → opencourse.uav@gmail.com (You - Copy)     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. Both inboxes receive the email                           │
│    ✅ Professor can read and reply                          │
│    ✅ You have a copy for records                           │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Key Points:

### 1. **Professor Emails are Hardcoded**
- Stored in `js/contact-new.js`
- No database needed
- Easy to update if professor changes

### 2. **Automatic Email Selection**
- When student clicks "Contact" on Dr. Yan Wan → uses `yan.wan@uta.edu`
- When student clicks "Contact" on Dr. Junfei Xie → uses `jxie4@sdsu.edu`
- When student clicks "Contact" on Dr. Kejie Lu → uses `kejie.lu@upr.edu`
- When student clicks "Contact" on Dr. Shengli Fu → uses `Shengli.Fu@unt.edu`

### 3. **Two Emails Sent**
- **Email 1:** Goes to the professor's actual inbox
- **Email 2:** Copy goes to opencourse.uav@gmail.com (for your records)

### 4. **Reply-To is Set**
- When professor clicks "Reply", it goes directly to the student
- No need to copy/paste email addresses

### 5. **Same as Main Contact Form**
- Landing page form → sends to opencourse.uav@gmail.com
- Professor form → sends to professor + copy to opencourse.uav@gmail.com
- Both use the same Google Apps Script backend
- Both work the same way from the student's perspective

---

## 🎯 Summary

**YES!** The professor emails are stored in the code (`js/contact-new.js`), and when a student clicks the "Contact" button:

1. ✅ JavaScript automatically gets the professor's email from storage
2. ✅ Shows the professor's info in the modal
3. ✅ Student fills the form
4. ✅ JavaScript sends everything to Google Apps Script
5. ✅ Google Apps Script sends email to professor's inbox
6. ✅ Google Apps Script sends copy to your inbox
7. ✅ Professor receives email and can reply directly to student

**No manual work needed!** Everything is automatic once you grant email permissions in Google Apps Script.

---

## 📧 All Professor Emails Configured:

| Professor | Email | Status |
|-----------|-------|--------|
| Dr. Yan Wan | yan.wan@uta.edu | ✅ Ready |
| Dr. Junfei Xie | jxie4@sdsu.edu | ✅ Ready |
| Dr. Kejie Lu | kejie.lu@upr.edu | ✅ Ready |
| Dr. Shengli Fu | Shengli.Fu@unt.edu | ✅ Ready |

All you need to do is grant email permissions in Google Apps Script, and the system will work automatically! 🚀
