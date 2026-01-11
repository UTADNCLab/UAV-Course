// ===================================
// AUTHENTICATION & USER MANAGEMENT
// Updated to work with new backend (passwordHash verification)
// ===================================

let currentUser = null;

// ===================================
// GOOGLE SHEETS INTEGRATION
// ===================================
const GOOGLE_SHEETS_CONFIG = {
    WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbxz-4ZhhhuSxBWs8cZ5NMnBlHf-Q_PdYwhxWjQOizXSP69U9l4EqkJYWWu7YMQctXUkTw/exec',
    SPREADSHEET_ID: '1EToB-Hs0GLOnB3Egi55fxKdeFTOC-Fg8p0BP9jiEvmc'
};

// ===================================
// INITIALIZE AUTH ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    setupAuthListeners();
    
    // Require login for course page
    if (window.location.pathname.includes('course.html')) {
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
// SHOW/HIDE AUTH MODAL
// ===================================
function showAuthModal() {
    if (currentUser) return;
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.add('show');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('show');
}

// ===================================
// HANDLE REGISTRATION
// ===================================
async function handleRegister(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    
    if (!firstName || !lastName || !email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    submitBtn.disabled = true;
    
    try {
        const passwordHash = hashPassword(password);
        
        // Send to backend
        const response = await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                action: 'register',
                data: {
                    firstName,
                    lastName,
                    email,
                    passwordHash
                }
            })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            // Create user object for local storage
            const user = {
                firstName,
                lastName,
                name: `${firstName} ${lastName}`,
                email,
                passwordHash,
                registeredDate: new Date().toISOString()
            };
            
            // Save locally
            currentUser = user;
            localStorage.setItem('uav_course_current_user', JSON.stringify(user));
            
            closeAuthModal();
            showLoggedInState();
            showNotification('Registration successful! Welcome! 🎉', 'success');
            
            setTimeout(() => window.location.reload(), 500);
        } else {
            showNotification(result.message || 'Registration failed', 'error');
        }
        
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
    
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    try {
        const passwordHash = hashPassword(password);
        
        // Send login request to backend
        const response = await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                action: 'login',
                data: {
                    email,
                    passwordHash
                }
            })
        });
        
        const result = await response.json();
        
        if (result.status === 'success' && result.user) {
            // Login successful - save user data
            const user = {
                firstName: result.user.firstName,
                lastName: result.user.lastName,
                name: `${result.user.firstName} ${result.user.lastName}`.trim(),
                email: result.user.email,
                passwordHash,
                lastLogin: new Date().toISOString()
            };
            
            currentUser = user;
            localStorage.setItem('uav_course_current_user', JSON.stringify(user));
            
            closeAuthModal();
            showLoggedInState();
            showNotification('Welcome back! 👋', 'success');
            
            setTimeout(() => window.location.reload(), 500);
        } else {
            showNotification(result.message || 'Invalid email or password', 'error');
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
        if (currentUser) {
            sendProgressUpdate('logout');
        }
        
        currentUser = null;
        localStorage.removeItem('uav_course_current_user');
        showLoggedOutState();
        showNotification('Logged out successfully', 'info');
        
        setTimeout(() => {
            window.location.href = 'landing.html';
        }, 1000);
    }
}

// ===================================
// SHOW LOGGED IN/OUT STATE
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

function showLoggedOutState() {
    const authButton = document.getElementById('authButton');
    const userInfo = document.getElementById('userInfo');
    
    if (authButton) authButton.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
}

// ===================================
// SEND DATA TO GOOGLE SHEETS
// ===================================
async function sendToGoogleSheets(action, data) {
    if (!GOOGLE_SHEETS_CONFIG.WEB_APP_URL) {
        console.warn('Google Sheets not configured');
        return;
    }
    
    try {
        await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action, data, timestamp: new Date().toISOString() })
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
    
    const email = currentUser.email.toLowerCase();
    const progressKey = `uav_course_progress_${email}`;
    const quizKey = `uav_course_quiz_scores_${email}`;
    
    const progressArray = JSON.parse(localStorage.getItem(progressKey) || '[]');
    const completedModules = Array.isArray(progressArray) ? progressArray : [];
    const quizScores = JSON.parse(localStorage.getItem(quizKey) || '{}');
    
    const totalModules = 8;
    const completionPercentage = Math.round((completedModules.length / totalModules) * 100);
    
    const progressData = {
        email: currentUser.email,
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        name: currentUser.name,
        eventType,
        completionPercentage,
        completedModules: completedModules.length,
        modulesCompleted: completedModules.length,  // Add this for backend compatibility
        totalModules,
        quizScores,
        totalQuizAttempts: Object.keys(quizScores).length,
        lastUpdated: new Date().toISOString()
    };
    
    console.log('Sending progress update:', progressData);
    await sendToGoogleSheets('progress', progressData);
}

// ===================================
// AUTO-SEND PROGRESS UPDATES
// ===================================
setInterval(() => {
    if (currentUser) sendProgressUpdate('auto');
}, 5 * 60 * 1000);

window.addEventListener('moduleCompleted', () => {
    if (currentUser) sendProgressUpdate('module_complete');
});

window.addEventListener('quizCompleted', () => {
    if (currentUser) sendProgressUpdate('quiz_complete');
});

window.addEventListener('beforeunload', () => {
    if (currentUser) sendProgressUpdate('page_unload');
});

// ===================================
// UTILITY FUNCTIONS
// ===================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

function setupAuthListeners() {
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const showForgotPasswordLink = document.getElementById('showForgotPassword');
    const backToLoginLink = document.getElementById('backToLogin');
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('registerForm').style.display = 'block';
            if (document.getElementById('forgotPasswordForm')) {
                document.getElementById('forgotPasswordForm').style.display = 'none';
            }
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
            if (document.getElementById('forgotPasswordForm')) {
                document.getElementById('forgotPasswordForm').style.display = 'none';
            }
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
// FORGOT PASSWORD (Placeholder)
// ===================================
async function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification('Password reset feature coming soon! Please contact support.', 'info');
}

function generateResetToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// ===================================
// REQUIRE LOGIN
// ===================================
function requireLogin() {
    if (!currentUser) {
        showNotification('Please login to access the course', 'info');
        showAuthModal();
        return false;
    }
    return true;
}

// Export functions
window.authFunctions = {
    requireLogin,
    sendProgressUpdate,
    currentUser: () => currentUser
};

console.log('%c🔐 Authentication System Loaded (Backend Verification)', 'color: #28a745; font-weight: bold;');
