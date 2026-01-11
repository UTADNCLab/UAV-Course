# 📧 Enable Password Reset Emails

## 🎯 Current Status

**Password reset is working, but emails are NOT being sent yet.**

Currently, when users click "Forgot Password":
- ✅ Reset link is generated
- ✅ Reset token is created
- ✅ Link is shown in alert/console
- ❌ **Email is NOT sent**

---

## 🔧 Why Emails Aren't Sending

The frontend (`js/auth.js`) currently only shows the reset link in an alert popup. It doesn't call the backend to send emails.

**To enable email sending, you need to:**

1. **Deploy Updated Backend** - The backend code has been updated with email functionality
2. **Update Frontend** - Modify `js/auth.js` to call the backend
3. **Grant Email Permissions** - Authorize Google Apps Script to send emails

---

## 📋 Step-by-Step: Enable Email Sending

### **Step 1: Deploy Updated Backend**

1. Go to: https://script.google.com/home
2. Open your "UAV Course Data" project
3. Replace ALL code with the contents of `backend/google-apps-script.js`
4. Click **Deploy** → **New deployment**
5. Select type: **Web app**
6. Execute as: **Me**
7. Who has access: **Anyone**
8. Click **Deploy**
9. Copy the new Web App URL

### **Step 2: Update Frontend to Call Backend**

The `js/auth.js` file needs to be updated to call the backend email endpoint.

**Current code** (lines ~595-640 in `js/auth.js`):
```javascript
async function handleForgotPassword(event) {
    // ... generates reset link ...
    
    // Currently just shows alert:
    alert(`Password Reset Link:\n\n${resetLink}`);
    
    // Switch back to login form
    document.getElementById('forgotPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}
```

**Updated code** (add email sending):
```javascript
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
        
        if (!email || !isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Generate reset token
        const resetToken = generateResetToken();
        const resetLink = `${window.location.origin}/reset-password.html?token=${resetToken}&email=${encodeURIComponent(email)}`;
        
        // Store reset token
        const resetData = {
            email: email,
            token: resetToken,
            expires: Date.now() + (60 * 60 * 1000)
        };
        localStorage.setItem('uav_course_reset_token', JSON.stringify(resetData));
        
        // NEW: Send email via backend
        try {
            const response = await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'sendPasswordReset',
                    data: {
                        email: email,
                        resetLink: resetLink,
                        resetToken: resetToken
                    }
                })
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                showNotification('Password reset email sent! Check your inbox.', 'success');
                console.log('✅ Reset email sent to:', email);
            } else {
                // Fallback: show link if email fails
                showNotification('Password reset link generated. Check console.', 'info');
                console.log('Reset link:', resetLink);
                alert(`Password Reset Link:\n\n${resetLink}`);
            }
        } catch (emailError) {
            // Fallback: show link if network error
            console.error('Email error:', emailError);
            showNotification('Password reset link generated. Check console.', 'info');
            console.log('Reset link:', resetLink);
            alert(`Password Reset Link:\n\n${resetLink}`);
        }
        
        // Switch back to login
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        
    } catch (error) {
        console.error('Password reset error:', error);
        showNotification('Failed to process password reset.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}
```

### **Step 3: Grant Email Permissions**

After deploying the backend:

1. Go to Google Apps Script editor
2. Click **Run** → Select `testEmailPermissions` function
3. Click **Review permissions**
4. Choose your Google account
5. Click **Advanced** → **Go to [Project Name] (unsafe)**
6. Click **Allow**

Now emails will be sent!

---

## 🧪 Testing Email Sending

### **Test 1: Verify Backend**
1. Open Google Apps Script editor
2. Run the `testEmailPermissions()` function
3. Check `opencourse.uav@gmail.com` inbox
4. You should receive a test email

### **Test 2: Test Password Reset**
1. Go to your website
2. Click "Login" → "Forgot Password?"
3. Enter your email
4. Click "Send Reset Link"
5. Check your email inbox
6. You should receive password reset email

---

## 📧 What the Email Looks Like

**Subject:** Password Reset - UAV Course

**Body:**
```
Hello [First Name] [Last Name],

You requested a password reset for your UAV Course account.

Click the link below to reset your password:
[Reset Link]

This link will expire in 1 hour.

If you didn't request this password reset, please ignore this email. 
Your password will remain unchanged.

Best regards,
UAV Course Team
```

---

## 🔒 Security Notes

- Reset links expire after 1 hour
- Only users in the Users sheet can request resets
- Admin receives a copy of all reset requests
- Emails sent from: `opencourse.uav@gmail.com`

---

## ❓ Troubleshooting

### **Issue: "Email not sent"**
**Solution:** 
1. Check if backend is deployed
2. Verify email permissions are granted
3. Check Google Apps Script logs for errors

### **Issue: "User not found"**
**Solution:** User must be registered in the Users sheet first

### **Issue: Reset link doesn't work**
**Solution:** 
1. Check if link expired (1 hour limit)
2. Generate new reset link
3. Verify token is stored in localStorage

---

## 🎉 Once Enabled

After completing these steps:
- ✅ Users receive password reset emails
- ✅ No more manual link copying
- ✅ Professional user experience
- ✅ Secure password recovery

---

## 📝 Quick Summary

**Current:** Reset link shown in alert (manual copy)  
**After Update:** Reset link sent via email (automatic)

**To enable:**
1. Deploy updated backend code
2. Update `js/auth.js` with email sending code
3. Grant email permissions in Google Apps Script

**Need help?** Check the code examples above or refer to `PASSWORD_RECOVERY_GUIDE.md`
