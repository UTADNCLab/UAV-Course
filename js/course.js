// ===================================
// GLOBAL VARIABLES
// ===================================
let courseData = null;
let currentModuleIndex = 0;
let completedModules = new Set();

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', async () => {
    // Check if user is logged in first
    const isLoggedIn = checkUserAuthentication();
    
    if (!isLoggedIn) {
        // Hide course content until logged in
        hideCourseContent();
        // Auth modal will be shown automatically by auth.js
        return;
    }
    
    // User is logged in, proceed with loading course
    await loadCourseData();
    
    // CRITICAL: Load progress BEFORE rendering UI
    loadProgress();
    
    // THEN render the UI with loaded progress
    initializePage();
    
    showWelcomeModal();
});

// ===================================
// OPEN NEXT NON-CERTIFICATE MODULE
// ===================================
function openNextNonCertificateModule(fromIndex) {
    for (let i = fromIndex + 1; i < courseData.modules.length; i++) {
        if (!isCertificateModule(courseData.modules[i])) {
            loadModule(i);
            return true;
        }
    }
    // No next learning module exists - go to first module
    loadModule(getDefaultModuleIndex());
    return false;
}

// ===================================
// CHECK USER AUTHENTICATION
// ===================================
function checkUserAuthentication() {
    const savedUser = localStorage.getItem('uav_course_current_user');
    return savedUser !== null;
}

// ===================================
// HIDE COURSE CONTENT
// ===================================
function hideCourseContent() {
    const mainContent = document.querySelector('.main-content');
    const instructorSection = document.querySelector('.instructor-section');
    
    if (mainContent) {
        mainContent.style.display = 'none';
    }
    if (instructorSection) {
        instructorSection.style.display = 'none';
    }
}

// ===================================
// SHOW COURSE CONTENT
// ===================================
function showCourseContent() {
    const mainContent = document.querySelector('.main-content');
    const instructorSection = document.querySelector('.instructor-section');
    
    if (mainContent) {
        mainContent.style.display = 'flex';
    }
    if (instructorSection) {
        instructorSection.style.display = 'block';
    }
}

// ===================================
// LOAD COURSE DATA
// ===================================
async function loadCourseData() {
    try {
        const response = await fetch('data/course-data.json');
        courseData = await response.json();
        console.log('Course data loaded successfully');
        
        // Store total modules per user
        const user = window.authFunctions ? window.authFunctions.currentUser() : null;
        const email = user?.email ? user.email.toLowerCase() : 'guest';
        localStorage.setItem(`uav_course_total_modules_${email}`, String(courseData.modules.length));
        
    } catch (error) {
        console.error('Error loading course data:', error);
        alert('Failed to load course data. Please refresh the page.');
    }
}

// ===================================
// INITIALIZE PAGE
// ===================================
function initializePage() {
    if (!courseData) {
        console.error('Course data not loaded');
        return;
    }

    console.log('Initializing page with', courseData.modules.length, 'modules');

    // Show course content
    showCourseContent();
    
    // Load modules list
    loadModulesList();
    
    // Load first NON-CERTIFICATE module
    loadModule(getDefaultModuleIndex());
}

// ===================================
// LOAD MODULES LIST WITH COLLAPSIBLE SECTIONS
// ===================================
function loadModulesList() {
    const modulesList = document.getElementById('modulesList');
    modulesList.innerHTML = '';

    // Group modules by section (every 2 items = 1 video + 1 quiz), except last item if it's certificate
    const sections = [];
    const modulesCount = courseData.modules.length;
    const lastModule = courseData.modules[modulesCount - 1];
    const hasCertificateModule = lastModule && lastModule.type === 'certificate';
    
    const regularModulesCount = hasCertificateModule ? modulesCount - 1 : modulesCount;
    
    for (let i = 0; i < regularModulesCount; i += 2) {
        sections.push({
            video: courseData.modules[i],
            quiz: courseData.modules[i + 1],
            videoIndex: i,
            quizIndex: i + 1
        });
    }

    sections.forEach((section, sectionIndex) => {
        // Create section container
        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'module-section';
        
        // Check if section is completed
        const sectionCompleted = completedModules.has(section.videoIndex) && completedModules.has(section.quizIndex);
        
        // Create section header (collapsible)
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'module-section-header';
        if (currentModuleIndex === section.videoIndex || currentModuleIndex === section.quizIndex) {
            sectionHeader.classList.add('active');
        }
        
        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'fas fa-play-circle toggle-icon';
        
        const sectionTitle = document.createElement('span');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = section.video.title;
        
        const sectionMeta = document.createElement('div');
        sectionMeta.className = 'section-meta';
        sectionMeta.innerHTML = `
            <span>${section.video.duration}</span>
            ${sectionCompleted ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' : ''}
        `;
        
        sectionHeader.appendChild(toggleIcon);
        sectionHeader.appendChild(sectionTitle);
        sectionHeader.appendChild(sectionMeta);
        
        // Create section content (items)
        const sectionContent = document.createElement('div');
        sectionContent.className = 'module-section-content';
        
        // Add video item
        const videoItem = document.createElement('div');
        videoItem.className = 'module-item';
        if (section.videoIndex === currentModuleIndex) videoItem.classList.add('active');
        if (completedModules.has(section.videoIndex)) videoItem.classList.add('completed');
        
        videoItem.innerHTML = `
            <div class="module-title">
                <i class="fas fa-play-circle"></i> ${section.video.title}
            </div>
            <div class="module-meta">
                <span>${section.video.duration}</span>
                ${completedModules.has(section.videoIndex) ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' : ''}
            </div>
        `;
        videoItem.onclick = () => loadModule(section.videoIndex);
        
        // Add quiz item
        const quizItem = document.createElement('div');
        quizItem.className = 'module-item';
        if (section.quizIndex === currentModuleIndex) quizItem.classList.add('active');
        if (completedModules.has(section.quizIndex)) quizItem.classList.add('completed');
        
        const questionCount = section.quiz.questions ? section.quiz.questions.length : 7;
        quizItem.innerHTML = `
            <div class="module-title">
                <i class="fas fa-clipboard-list"></i> ${section.quiz.title}
            </div>
            <div class="module-meta">
                <span>${questionCount} questions</span>
                ${completedModules.has(section.quizIndex) ? '<i class="fas fa-check-circle" style="color: #10b981;"></i>' : ''}
            </div>
        `;
        quizItem.onclick = () => loadModule(section.quizIndex);
        
        sectionContent.appendChild(videoItem);
        sectionContent.appendChild(quizItem);
        
        // Toggle functionality
        sectionHeader.onclick = (e) => {
            e.stopPropagation();
            sectionContainer.classList.toggle('collapsed');
        };
        
        // Assemble section
        sectionContainer.appendChild(sectionHeader);
        sectionContainer.appendChild(sectionContent);
        
        // Auto-expand if current module is in this section
        if (currentModuleIndex === section.videoIndex || currentModuleIndex === section.quizIndex) {
            sectionContainer.classList.remove('collapsed');
        } else {
            sectionContainer.classList.add('collapsed');
        }
        
        modulesList.appendChild(sectionContainer);
    });
    
    // Certificate section will be added at the end after updateProgress()

    updateProgress();
    
    // Add certificate module at the END if it exists
    if (hasCertificateModule) {
        const certificateIndex = modulesCount - 1;
        const certificateModule = courseData.modules[certificateIndex];
        
        // Get user-specific quiz scores
        const user = window.authFunctions ? window.authFunctions.currentUser() : null;
        const quizKey = user?.email ? `uav_course_quiz_scores_${user.email.toLowerCase()}` : 'uav_course_quiz_scores_guest';
        const quizScores = JSON.parse(localStorage.getItem(quizKey) || '{}');
        
        // Check if user has completed BOTH video AND quiz for at least one module with 80%+
        const hasEligibleScore = Object.entries(quizScores).some(([quizId, score]) => {
            if (score.percentage >= 80) {
                // Check if corresponding video is also completed
                const quizIdMap = {
                    'quiz-1': { video: 0, quiz: 1 },
                    'quiz-2': { video: 2, quiz: 3 },
                    'quiz-3': { video: 4, quiz: 5 },
                    'quiz-4': { video: 6, quiz: 7 }
                };
                const moduleIndices = quizIdMap[quizId];
                return moduleIndices && completedModules.has(moduleIndices.video) && completedModules.has(moduleIndices.quiz);
            }
            return false;
        });
        
        // Count how many complete modules are eligible (both video AND quiz done with 80%+)
        const eligibleCount = Object.entries(quizScores).filter(([quizId, score]) => {
            if (score.percentage >= 80) {
                const quizIdMap = {
                    'quiz-1': { video: 0, quiz: 1 },
                    'quiz-2': { video: 2, quiz: 3 },
                    'quiz-3': { video: 4, quiz: 5 },
                    'quiz-4': { video: 6, quiz: 7 }
                };
                const moduleIndices = quizIdMap[quizId];
                return moduleIndices && completedModules.has(moduleIndices.video) && completedModules.has(moduleIndices.quiz);
            }
            return false;
        }).length;
        
        const certificateItem = document.createElement('div');
        certificateItem.className = 'module-section';
        certificateItem.style.marginTop = '20px';
        certificateItem.style.borderTop = '2px solid #F47E3C';
        certificateItem.style.paddingTop = '15px';
        
        if (!hasEligibleScore) {
            certificateItem.style.opacity = '0.5';
            certificateItem.style.pointerEvents = 'none';
        }
        
        const certificateHeader = document.createElement('div');
        certificateHeader.className = 'module-section-header';
        certificateHeader.style.background = 'linear-gradient(135deg, #0064A4 0%, #003366 100%)';
        certificateHeader.style.color = 'white';
        certificateHeader.style.padding = '15px';
        certificateHeader.style.borderRadius = '8px';
        
        if (currentModuleIndex === certificateIndex) {
            certificateHeader.classList.add('active');
        }
        
        const statusText = hasEligibleScore 
            ? `${eligibleCount} Module${eligibleCount > 1 ? 's' : ''} Completed` 
            : 'Complete quizzes to unlock';
        
        certificateHeader.innerHTML = `
            <i class="fas fa-certificate toggle-icon" style="color: #F47E3C;"></i>
            <span class="section-title">${certificateModule.title}</span>
            <div class="section-meta" style="color: white;">
                <span>${statusText}</span>
                ${hasEligibleScore ? '<i class="fas fa-unlock" style="color: #10b981;"></i>' : '<i class="fas fa-lock" style="color: #999;"></i>'}
            </div>
        `;
        
        certificateHeader.onclick = () => {
            if (hasEligibleScore) {
                loadModule(certificateIndex);
            } else {
                showNotification('Complete at least one quiz with 80%+ to unlock certificate', 'info');
            }
        };
        
        certificateItem.appendChild(certificateHeader);
        modulesList.appendChild(certificateItem);
    }
}

// ===================================
// HELPER: Check if module is certificate
// ===================================
function isCertificateModule(mod) {
    return mod && mod.type === 'certificate';
}

// ===================================
// GET DEFAULT MODULE INDEX (never certificate)
// ===================================
function getDefaultModuleIndex() {
    // Open first non-certificate module
    for (let i = 0; i < courseData.modules.length; i++) {
        if (!isCertificateModule(courseData.modules[i])) {
            return i;
        }
    }
    return 0;
}

// ===================================
// LOAD MODULE
// ===================================
function loadModule(index) {
    if (!courseData || index < 0 || index >= courseData.modules.length) return;

    const module = courseData.modules[index];
    
    // CRITICAL: Certificate can ONLY be opened via explicit click
    if (isCertificateModule(module)) {
        // Generate and show certificate
        if (typeof generateCumulativeCertificate === 'function') {
            generateCumulativeCertificate();
        } else {
            showNotification('Certificate system loading...', 'info');
        }
        return; // Don't update currentModuleIndex or UI
    }

    // Safe to load non-certificate module
    currentModuleIndex = index;

    // Hide both sections first
    const videoSection = document.querySelector('.video-section');
    const quizSection = document.getElementById('quizSection');
    const mainContent = document.querySelector('.main-content');
    
    if (videoSection) videoSection.style.display = 'none';
    if (quizSection) {
        quizSection.style.display = 'none';
        quizSection.classList.remove('active');
    }

    if (module.type === 'video') {
        loadVideoModule(module);
        // Show main content for videos
        if (mainContent) mainContent.classList.remove('quiz-active');
        document.body.classList.remove('quiz-active');
    } else if (module.type === 'quiz') {
        loadQuizModule(module);
        // Hide main content for quizzes
        if (mainContent) mainContent.classList.add('quiz-active');
        document.body.classList.add('quiz-active');
        if (quizSection) {
            quizSection.classList.add('active');
            quizSection.style.display = 'block';
        }
    }

    // Update modules list
    loadModulesList();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ===================================
// LOAD VIDEO MODULE
// ===================================
function loadVideoModule(module) {
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
        videoSection.style.display = 'block';
    }
    
    const videoTitle = document.getElementById('videoTitle');
    const videoDuration = document.getElementById('videoDuration');
    const moduleNumber = document.getElementById('moduleNumber');
    const videoDescription = document.getElementById('videoDescription');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (videoTitle) videoTitle.textContent = module.title;
    if (videoDuration) videoDuration.textContent = module.duration;
    if (moduleNumber) moduleNumber.textContent = (Math.floor(currentModuleIndex / 2) + 1);
    if (videoDescription) videoDescription.textContent = module.description;
    if (videoPlayer) {
        videoPlayer.src = module.videoUrl;
        
        // Add event listener for when video ends
        videoPlayer.onended = function() {
            if (!completedModules.has(currentModuleIndex)) {
                markComplete();
            }
        };
    }

    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const completeBtn = document.getElementById('completeBtn');
    
    if (prevBtn) prevBtn.disabled = currentModuleIndex === 0;
    if (nextBtn) nextBtn.disabled = currentModuleIndex === courseData.modules.length - 1;
    
    if (completeBtn) {
        if (completedModules.has(currentModuleIndex)) {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Completed';
            completeBtn.disabled = true;
        } else {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark Complete';
            completeBtn.disabled = false;
        }
    }
}

// ===================================
// LOAD QUIZ MODULE
// ===================================
function loadQuizModule(module) {
    const quizSection = document.getElementById('quizSection');
    const quizTitle = document.getElementById('quizTitle');
    const quizIntro = document.getElementById('quizIntro');
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    
    if (quizSection) quizSection.style.display = 'block';
    if (quizTitle) quizTitle.textContent = module.title;
    
    // Reset quiz
    if (quizIntro) quizIntro.style.display = 'block';
    if (quizContent) quizContent.style.display = 'none';
    if (quizResults) quizResults.style.display = 'none';
}

// ===================================
// MARK COMPLETE
// ===================================
function markComplete() {
    completedModules.add(currentModuleIndex);
    saveProgress();
    loadModulesList();
    
    showNotification('Module completed! 🎉', 'success');
    
    // Auto-advance to next non-certificate module
    setTimeout(() => nextModule(), 1000);
}

// ===================================
// NAVIGATION (Skip certificate modules)
// ===================================
function previousModule() {
    if (currentModuleIndex > 0) {
        loadModule(currentModuleIndex - 1);
    }
}

function nextModule() {
    // Find next non-certificate module
    for (let i = currentModuleIndex + 1; i < courseData.modules.length; i++) {
        if (!isCertificateModule(courseData.modules[i])) {
            loadModule(i);
            return;
        }
    }
    
    // No next learning module - calculate completion and show appropriate message
    const total = courseData.modules.filter(m => m.type !== 'certificate').length;
    const completed = Array.from(completedModules).filter(i => courseData.modules[i]?.type !== 'certificate').length;
    const percentage = Math.round((completed / total) * 100);
    const remaining = total - completed;
    
    // Check if 100% complete
    if (percentage === 100) {
        showNotification('🎉 All modules completed! Click the certificate in the sidebar to view your achievements.', 'success');
    } else {
        showNotification(`${completed}/${total} modules completed (${percentage}%). ${remaining} remaining. Going back to Module 1.`, 'info');
    }
    
    setTimeout(() => {
        loadModule(getDefaultModuleIndex());
    }, 1500);
}

// ===================================
// PROGRESS
// ===================================
function updateProgress() {
    // Exclude certificate module from progress calculation
    const total = courseData.modules.filter(m => m.type !== 'certificate').length;
    const completed = Array.from(completedModules).filter(i => courseData.modules[i]?.type !== 'certificate').length;
    
    const percentage = Math.round((completed / total) * 100);

    document.getElementById('progressBar').style.width = percentage + '%';
    document.getElementById('progressPercent').textContent = percentage + '%';
    document.getElementById('completedCount').textContent = completed;
    
    // Send progress to backend if user is logged in
    if (window.authFunctions && window.authFunctions.currentUser()) {
        window.authFunctions.sendProgressUpdate('progress_update');
    }
}

function saveProgress() {
    // Get current user
    const user = window.authFunctions ? window.authFunctions.currentUser() : null;
    if (!user) return;
    
    // Save progress per user
    const userProgressKey = `uav_course_progress_${user.email.toLowerCase()}`;
    localStorage.setItem(userProgressKey, JSON.stringify(Array.from(completedModules)));
    
    updateProgress();
    
    console.log(`Progress saved for ${user.email}:`, Array.from(completedModules));
}

function loadProgress() {
    // Get current user
    const user = window.authFunctions ? window.authFunctions.currentUser() : null;
    if (!user) return;
    
    // MIGRATION: Remove old global progress data (one-time cleanup)
    const oldGlobalProgress = localStorage.getItem('uav_course_progress');
    const oldGlobalQuizScores = localStorage.getItem('uav_course_quiz_scores');
    
    if (oldGlobalProgress || oldGlobalQuizScores) {
        console.warn('⚠️ Found old global data - cleaning up...');
        localStorage.removeItem('uav_course_progress');
        localStorage.removeItem('uav_course_quiz_scores');
        localStorage.removeItem('uav_course_total_modules');
        console.log('✅ Old global data removed');
    }
    
    // Load progress for this specific user (use lowercase email)
    const userProgressKey = `uav_course_progress_${user.email.toLowerCase()}`;
    const saved = localStorage.getItem(userProgressKey);
    
    if (saved) {
        completedModules = new Set(JSON.parse(saved));
        console.log(`Progress loaded for ${user.email}:`, Array.from(completedModules));
    } else {
        // New user - initialize empty progress
        completedModules = new Set();
        console.log(`New user ${user.email} - starting with 0% progress`);
    }
    
    // Sync with user-specific quiz scores - mark quizzes complete if passed with 80%+
    const quizKey = user?.email ? `uav_course_quiz_scores_${user.email.toLowerCase()}` : 'uav_course_quiz_scores_guest';
    const quizScores = JSON.parse(localStorage.getItem(quizKey) || '{}');
    const quizIdMap = {
        'quiz-1': 1,  // Module index 1
        'quiz-2': 3,  // Module index 3
        'quiz-3': 5,  // Module index 5
        'quiz-4': 7   // Module index 7
    };
    
    let progressChanged = false;
    Object.keys(quizScores).forEach(quizId => {
        const score = quizScores[quizId];
        if (score.percentage >= 80) {
            const quizIndex = quizIdMap[quizId];
            if (quizIndex !== undefined && !completedModules.has(quizIndex)) {
                // Mark quiz as complete
                completedModules.add(quizIndex);
                progressChanged = true;
                console.log(`Auto-marking quiz ${quizIndex} as complete (score: ${score.percentage}%)`);
            }
        }
    });
    
    // Save progress after loading if there were changes
    if (progressChanged) {
        localStorage.setItem(userProgressKey, JSON.stringify(Array.from(completedModules)));
        console.log(`Progress persisted for ${user.email}`);
    }
    
    // Update progress display
    updateProgress();
}

// ===================================
// MODALS
// ===================================
function showWelcomeModal() {
    if (!courseData) return;
    
    const modal = document.getElementById('welcomeModal');
    document.getElementById('welcomeText').textContent = courseData.course.welcomeMessage;
    modal.classList.add('show');
}

function closeWelcomeModal() {
    document.getElementById('welcomeModal').classList.remove('show');
}

function showCongratsModal() {
    const modal = document.getElementById('congratsModal');
    document.getElementById('congratsText').textContent = courseData.course.congratulationsMessage;
    modal.classList.add('show');
}

function closeCongrats() {
    document.getElementById('congratsModal').classList.remove('show');
}



// ===================================
// NOTIFICATIONS
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'success') notification.style.background = '#10b981';
    if (type === 'error') notification.style.background = '#ef4444';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

console.log('%c🚁 UAV Course Platform Loaded!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
