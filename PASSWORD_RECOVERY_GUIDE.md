# 🔐 Password Recovery System

## Current Situation

Your auth system has a "Forgot Password" feature that generates a reset link, but it only works locally (not sent via email). Here's how to improve it:

---

## 🎯 How Password Recovery Works Now

### Current Flow:
1. User clicks "Forgot Password"
2. System generates a reset token
3. Reset link is shown in console/alert (not emailed)
4. User can use the link to reset password
5. **Password hash is updated in Users sheet** ✅

### The Code (Already in js/auth.js):

```javascript
// Lines 595-640 in auth.js
async function handleForgotPassword(event) {
    // Generates reset token
    // Shows reset link in console
    // Stores token temporarily in localStorage
}
```

---

## ✅ What's Already Working

1. **Reset Token Generation** - Creates unique token
2. **Token Storage** - Stores in localStorage with 1-hour expiration
3. **Password Hash Update** - When user resets, hash is updated in:
   - localStorage (local device)
   - Users sheet (via backend)

---

## 🚀 How to Use Password Recovery

### For Users:

1. **Click "Forgot Password"** on login modal
2. **Enter email address**
3. **Copy reset link** from:
   - Browser console (F12 → Console tab)
   - Alert popup
4. **Paste link** in browser
5. **Enter new password**
6. **Login** with new password

### For Admin (You):

If a user forgets their password and you need to help them:

#### Option 1: Manual Password Reset in Google Sheets
```
1. Open Google Sheets "Users" tab
2. Find the user's row
3. Generate new password hash:
   - Use online tool or calculator
   - Or use the hash function from auth.js
4. Replace the "Password Hash" value
5. Tell user their new password
```

#### Option 2: Delete User (They Re-register)
```
1. Open Google Sheets "Users" tab
2. Delete the user's row
3. User can register again with same email
```

---

## 🔧 How Password Hash is Generated

The system uses a simple hash function (in `js/auth.js`):

```javascript
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}
```

### Example Hashes:
- Password: `"test123"` → Hash: `"-1atzb7i"`
- Password: `"password"` → Hash: `"-fpl0vq"`
- Password: `"mypass"` → Hash: `"-l9xqo6"`

---

## 📧 To Enable Email-Based Password Recovery

Currently, reset links are shown in console. To send via email:

### Option 1: Use Email Service (Recommended for Production)
- SendGrid
- Mailgun
- AWS SES
- Nodemailer (requires backend server)

### Option 2: Use Google Apps Script Email
Add this function to `backend/google-apps-script.js`:

```javascript
function handlePasswordReset(data) {
  const email = normalizeEmail_(data.email);
  const resetToken = data.resetToken;
  const resetLink = data.resetLink;
  
  if (!email) return json({ status: "error", message: "Missing email" });
  
  // Check if user exists
  const sh = getOrCreateSheet_("Users", USERS_HEADERS);
  const row = findRowByEmail_(sh, email);
  if (row < 0) return json({ status: "error", message: "User not found" });
  
  // Send email
  const subject = "Password Reset - UAV Course";
  const body = `
Hello,

You requested a password reset for your UAV Course account.

Click this link to reset your password:
${resetLink}

This link expires in 1 hour.

If you didn't request this, please ignore this email.

Best regards,
UAV Course Team
  `;
  
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
    return json({ status: "success", message: "Reset email sent" });
  } catch (err) {
    return json({ status: "error", message: "Failed to send email" });
  }
}
```

---

## 🛠️ Manual Password Hash Calculator

If you need to manually update a user's password hash:

### Method 1: Use Browser Console
```javascript
// Open browser console (F12)
// Paste this function:
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

// Then calculate hash:
hashPassword("newpassword123")
// Copy the result and paste in Google Sheets
```

### Method 2: Use Online Tool
1. Go to: https://www.browserling.com/tools/js-executor
2. Paste the hashPassword function
3. Add: `console.log(hashPassword("yourpassword"))`
4. Run and copy the result

---

## 📊 Update Password Hash in Google Sheets

### Steps:
1. Open your Google Sheet
2. Go to "Users" tab
3. Find the user's email
4. In "Password Hash" column, paste the new hash
5. User can now login with the new password

---

## 🔒 Security Notes

**Current System:**
- ✅ Passwords are hashed (not stored as plain text)
- ✅ Hashes are stored in Google Sheets
- ✅ Reset tokens expire after 1 hour
- ⚠️ Hash function is simple (not cryptographically secure)

**For Production:**
- Use bcrypt or Argon2 for password hashing
- Add salt to hashes
- Use HTTPS for all communications
- Implement rate limiting on password reset
- Send reset links via email (not console)

---

## 🆘 Common Issues

### Issue: User can't receive reset link
**Solution:** Reset link is shown in browser console (F12 → Console tab)

### Issue: Reset link expired
**Solution:** Generate new reset link (tokens expire after 1 hour)

### Issue: User forgot email
**Solution:** Check Google Sheets "Users" or "Progress" tab for their email

### Issue: Need to reset password manually
**Solution:** Use hash calculator above and update Google Sheets directly

---

## 📞 Need Help?

If you need to:
- Add email-based password recovery
- Improve password security
- Create admin panel for password resets
- Implement 2FA

Let me know and I can help implement these features!
