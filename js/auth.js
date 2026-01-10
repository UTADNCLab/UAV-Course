// ===================================
// AUTHENTICATION & USER MANAGEMENT
// ===================================

let currentUser = null;

// ===================================
// HELPER FUNCTION FOR PER-USER KEYS
// ===================================
function userKey(base) {
    const email = currentUser?.email ? currentUser.email.toLowerCase() : 'guest';
    return `${base}_${email}`;
}

// ===================================
// GOOGLE SHEETS INTEGRATION
// ===================================

// IMPORTANT: Replace these with your actual values after setup
const GOOGLE_SHEETS_CONFIG = {
    // Get this from Google Apps Script deployment
    WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbydIxbmfk7UIZVRsdDocnECUJByx8VWExiE2aRmYrnQ5-Hetn4H3oF0vriBZe0dj_i9Mg/exec',
    // Your spreadsheet ID (from the URL)
    SPREADSHEET_ID: '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc'
};

// ===================================
// INITIALIZE AUTH ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    setupAuthListeners();
    
    // Require login for course page (index.html)
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        if (!currentUser) {
            showAuthModal();
        }
    }
});

// ===================================
// CHECK IF USER IS LOGGED IN
// ===================================
function checkLoginStatus() {
    const savedUser = localStorage.getItem('uav_course_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showLoggedInState();
    } else {
        showLoggedOutState();
    }
}

// ===================================
// SHOW LOGIN/REGISTER MODAL
// ===================================
function showAuthModal() {
    // Don't show modal if user is already logged in
    if (currentUser) {
        return;
    }
    
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// ===================================
// HANDLE REGISTRATION
// ===================================
async function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    if (!firstName || !lastName || !email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const name = `${firstName} ${lastName}`;
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    submitBtn.disabled = true;
    
    try {
        // Get all registered users
        const allUsers = JSON.parse(localStorage.getItem('uav_course_users') || '{}');
        
        // Check if user already exists
        if (allUsers[email]) {
            showNotification('An account with this email already exists. Please login instead.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Switch to login form
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
            return;
        }
        
        // Create user object
        const user = {
            firstName: firstName,
            lastName: lastName,
            name: name,
            email: email,
            password: hashPassword(password),
            registeredDate: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        // Save user to all users
        allUsers[email] = user;
        localStorage.setItem('uav_course_users', JSON.stringify(allUsers));
        
        // Set as current user
        currentUser = user;
        localStorage.setItem('uav_course_current_user', JSON.stringify(user));
        
        // Send to Google Sheets
        await sendToGoogleSheets('register', user);
        
        // Close modal and show success
        closeAuthModal();
        showLoggedInState();
        showNotification('Registration successful! Welcome to the course! 🎉', 'success');
        
        // Reload the page to show course content
        setTimeout(() => {
            window.location.reload();
        }, 500);
        
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ===================================
// HANDLE LOGIN
// ===================================
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    try {
        const hashedPassword = hashPassword(password);
        
        // Get all registered users
        const allUsers = JSON.parse(localStorage.getItem('uav_course_users') || '{}');
        
        // Check if user exists
        if (allUsers[email] && allUsers[email].password === hashedPassword) {
            // Login successful
            const user = allUsers[email];
            user.lastLogin = new Date().toISOString();
            
            // Update user in storage
            allUsers[email] = user;
            localStorage.setItem('uav_course_users', JSON.stringify(allUsers));
            
            // Set current user
            currentUser = user;
            localStorage.setItem('uav_course_current_user', JSON.stringify(user));
            
            // Update Google Sheets
            await sendToGoogleSheets('login', user);
            
            closeAuthModal();
            showLoggedInState();
            showNotification('Welcome back! 👋', 'success');
            
            // Reload the page to show course content
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else {
            showNotification('Invalid email or password', 'error');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ===================================
// HANDLE LOGOUT
// ===================================
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Send final progress update
        if (currentUser) {
            sendProgressUpdate('logout');
        }
        
        currentUser = null;
        localStorage.removeItem('uav_course_current_user');
        showLoggedOutState();
        showNotification('Logged out successfully', 'info');
        
        // Redirect to landing page
        setTimeout(() => {
            window.location.href = 'landing.html';
        }, 1000);
    }
}

// ===================================
// SHOW LOGGED IN STATE
// ===================================
function showLoggedInState() {
    const authButton = document.getElementById('authButton');
    const userInfo = document.getElementById('userInfo');
    
    if (authButton && currentUser) {
        authButton.style.display = 'none';
    }
    
    if (userInfo && currentUser) {
        userInfo.style.display = 'flex';
        userInfo.innerHTML = `
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="user-details">
                <span class="user-name">${currentUser.name}</span>
                <span class="user-email">${currentUser.email}</span>
            </div>
            <button class="btn-logout" onclick="handleLogout()" title="Logout">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        `;
    }
}

// ===================================
// SHOW LOGGED OUT STATE
// ===================================
function showLoggedOutState() {
    const authButton = document.getElementById('authButton');
    const userInfo = document.getElementById('userInfo');
    
    if (authButton) {
        authButton.style.display = 'block';
    }
    
    if (userInfo) {
        userInfo.style.display = 'none';
    }
}

// ===================================
// SEND DATA TO GOOGLE SHEETS
// ===================================
async function sendToGoogleSheets(action, data) {
    if (!GOOGLE_SHEETS_CONFIG.WEB_APP_URL || GOOGLE_SHEETS_CONFIG.WEB_APP_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Sheets not configured. Data will only be stored locally.');
        return;
    }
    
    try {
        // Use text/plain to avoid CORS preflight
        const response = await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: action,
                data: data,
                timestamp: new Date().toISOString()
            })
        });
        
        console.log('Data sent to Google Sheets successfully');
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
    }
}

// ===================================
// SEND PROGRESS UPDATE
// ===================================
async function sendProgressUpdate(eventType = 'progress') {
    if (!currentUser) return;
    
    // Get per-user keys
    const email = currentUser.email.toLowerCase();
    const progressKey = `uav_course_progress_${email}`;
    const quizKey = `uav_course_quiz_scores_${email}`;
    
    // Get progress from per-user localStorage keys
    const progressArray = JSON.parse(localStorage.getItem(progressKey) || '[]');
    const completedModules = Array.isArray(progressArray) ? progressArray : [];
    
    // Get quiz scores from per-user storage
    const quizScores = JSON.parse(localStorage.getItem(quizKey) || '{}');
    
    // Get total modules (or default to 8)
    const totalModules = 8;
    
    // Calculate statistics
    const completionPercentage = Math.round((completedModules.length / totalModules) * 100);
    
    const quizResults = Object.values(quizScores);
    const totalQuizAttempts = quizResults.length;
    
    const progressData = {
        email: currentUser.email,
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        name: currentUser.name,
        eventType: eventType,
        completionPercentage: completionPercentage,
        completedModules: completedModules.length,
        totalModules: totalModules,
        quizScores: quizScores,
        totalQuizAttempts: totalQuizAttempts,
        lastUpdated: new Date().toISOString()
    };
    
    console.log('Sending progress update:', progressData);
    await sendToGoogleSheets('progress', progressData);
}

// ===================================
// AUTO-SEND PROGRESS UPDATES
// ===================================
// Send progress every 5 minutes
setInterval(() => {
    if (currentUser) {
        sendProgressUpdate('auto');
    }
}, 5 * 60 * 1000);

// Send progress when module is completed
window.addEventListener('moduleCompleted', () => {
    if (currentUser) {
        sendProgressUpdate('module_complete');
    }
});

// Send progress when quiz is completed
window.addEventListener('quizCompleted', () => {
    if (currentUser) {
        sendProgressUpdate('quiz_complete');
    }
});

// Send progress before page unload
window.addEventListener('beforeunload', () => {
    if (currentUser) {
        sendProgressUpdate('page_unload');
    }
});

// ===================================
// UTILITY FUNCTIONS
// ===================================
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function hashPassword(password) {
    // Simple hash function (in production, use proper encryption)
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

function setupAuthListeners() {
    // Switch between login and register forms
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const showForgotPasswordLink = document.getElementById('showForgotPassword');
    const backToLoginLink = document.getElementById('backToLogin');
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
            document.getElementById('forgotPasswordForm').style.display = 'none';
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('forgotPasswordForm').style.display = 'none';
        });
    }
    
    if (showForgotPasswordLink) {
        showForgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('forgotPasswordForm').style.display = 'block';
        });
    }
    
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('forgotPasswordForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        });
    }
}

// ===================================
// HANDLE FORGOT PASSWORD
// ===================================
async function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Get all registered users
        const allUsers = JSON.parse(localStorage.getItem('uav_course_users') || '{}');
        
        // Check if user exists
        if (!allUsers[email]) {
            showNotification('No account found with this email address', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // In a real application, you would send an email here
        // For now, we'll show the password reset instructions
        const resetToken = generateResetToken();
        const resetLink = `${window.location.origin}/reset-password.html?token=${resetToken}&email=${encodeURIComponent(email)}`;
        
        // Store reset token temporarily (expires in 1 hour)
        const resetData = {
            email: email,
            token: resetToken,
            expires: Date.now() + (60 * 60 * 1000) // 1 hour
        };
        localStorage.setItem('uav_course_reset_token', JSON.stringify(resetData));
        
        // Show success message with instructions
        showNotification('Password reset instructions sent! Check the console for the reset link.', 'success');
        console.log('%c🔐 PASSWORD RESET LINK', 'color: #ef4444; font-size: 16px; font-weight: bold;');
        console.log('Copy this link to reset your password:');
        console.log(resetLink);
        console.log('\nNote: In production, this would be sent to your email.');
        
        // For demo purposes, also show an alert
        alert(`Password Reset Link (copy from console):\n\n${resetLink}\n\nNote: In a production environment, this would be sent to your email: ${email}`);
        
        // Switch back to login form
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
        
    } catch (error) {
        console.error('Password reset error:', error);
        showNotification('Failed to process password reset. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// ===================================
// GENERATE RESET TOKEN
// ===================================
function generateResetToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// ===================================
// REQUIRE LOGIN FOR COURSE ACCESS
// ===================================
function requireLogin() {
    if (!currentUser) {
        showNotification('Please login to access the course', 'info');
        showAuthModal();
        return false;
    }
    return true;
}

// Export functions for use in other files
window.authFunctions = {
    requireLogin,
    sendProgressUpdate,
    currentUser: () => currentUser
};

console.log('%c🔐 Authentication System Loaded', 'color: #28a745; font-weight: bold;');
