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
    initializePage();
    loadProgress();
    showWelcomeModal();
});

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
    
    // Load first module
    loadModule(0);
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
        
        // Check if user has at least one quiz with 80%+
        const quizScores = JSON.parse(localStorage.getItem('uav_course_quiz_scores') || '{}');
        const hasEligibleScore = Object.values(quizScores).some(score => score.percentage >= 80);
        
        // Count how many modules are eligible
        const eligibleCount = Object.values(quizScores).filter(score => score.percentage >= 80).length;
        
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
// LOAD MODULE
// ===================================
function loadModule(index) {
    if (!courseData || index < 0 || index >= courseData.modules.length) return;

    currentModuleIndex = index;
    const module = courseData.modules[index];

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
    } else if (module.type === 'certificate') {
        // Generate and show certificate
        if (typeof generateCumulativeCertificate === 'function') {
            generateCumulativeCertificate();
        } else {
            showNotification('Certificate system loading...', 'info');
        }
        return; // Don't update modules list or scroll
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
    if (videoPlayer) videoPlayer.src = module.videoUrl;

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
    
    // Auto-advance to next module
    if (currentModuleIndex < courseData.modules.length - 1) {
        setTimeout(() => nextModule(), 1000);
    } else {
        // Course completed
        setTimeout(() => showCongratsModal(), 1000);
    }
}

// ===================================
// NAVIGATION
// ===================================
function previousModule() {
    if (currentModuleIndex > 0) {
        loadModule(currentModuleIndex - 1);
    }
}

function nextModule() {
    if (currentModuleIndex < courseData.modules.length - 1) {
        loadModule(currentModuleIndex + 1);
    }
}

// ===================================
// PROGRESS
// ===================================
function updateProgress() {
    const total = courseData.modules.length;
    const completed = completedModules.size;
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
    localStorage.setItem('uav_course_progress', JSON.stringify(Array.from(completedModules)));
    updateProgress();
}

function loadProgress() {
    const saved = localStorage.getItem('uav_course_progress');
    if (saved) {
        completedModules = new Set(JSON.parse(saved));
    }
    
    // Sync with quiz scores - mark modules complete if quiz was passed
    const quizScores = JSON.parse(localStorage.getItem('uav_course_quiz_scores') || '{}');
    const quizIdMap = {
        'quiz-1': 1,  // Module index 1
        'quiz-2': 3,  // Module index 3
        'quiz-3': 5,  // Module index 5
        'quiz-4': 7   // Module index 7
    };
    
    Object.keys(quizScores).forEach(quizId => {
        const score = quizScores[quizId];
        if (score.percentage >= 70) {
            const quizIndex = quizIdMap[quizId];
            if (quizIndex !== undefined) {
                // Mark quiz as complete
                completedModules.add(quizIndex);
                // Also mark the video module before it as complete
                if (quizIndex > 0) {
                    completedModules.add(quizIndex - 1);
                }
            }
        }
    });
    
    // Save the synced progress
    saveProgress();
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
