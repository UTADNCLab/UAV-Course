// ===================================
// PROGRESS TRACKING SYSTEM
// ===================================

// ===================================
// PROGRESS DATA STRUCTURE
// ===================================
class ProgressTracker {
    constructor() {
        this.storageKey = 'uav_course_progress';
        this.data = this.loadFromStorage();
    }

    loadFromStorage() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading progress:', e);
                return this.getDefaultData();
            }
        }
        return this.getDefaultData();
    }

    getDefaultData() {
        return {
            completedModules: [],
            currentModuleIndex: 0,
            quizScores: {},
            videoProgress: {},
            lastAccessed: null,
            totalTimeSpent: 0,
            startDate: new Date().toISOString(),
            certificateGenerated: false,
            studentName: null
        };
    }

    save() {
        this.data.lastAccessed = new Date().toISOString();
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    reset() {
        this.data = this.getDefaultData();
        this.save();
    }

    // Module completion
    markModuleComplete(moduleIndex) {
        if (!this.data.completedModules.includes(moduleIndex)) {
            this.data.completedModules.push(moduleIndex);
            this.save();
        }
    }

    isModuleComplete(moduleIndex) {
        return this.data.completedModules.includes(moduleIndex);
    }

    getCompletionPercentage() {
        if (!courseData) return 0;
        return Math.round((this.data.completedModules.length / courseData.modules.length) * 100);
    }

    // Quiz scores
    saveQuizScore(quizId, score, totalQuestions) {
        this.data.quizScores[quizId] = {
            score: score,
            total: totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            date: new Date().toISOString(),
            passed: (score / totalQuestions) >= 0.7
        };
        this.save();
    }

    getQuizScore(quizId) {
        return this.data.quizScores[quizId] || null;
    }

    // Video progress
    saveVideoProgress(videoId, progress) {
        this.data.videoProgress[videoId] = {
            progress: progress,
            lastWatched: new Date().toISOString()
        };
        this.save();
    }

    getVideoProgress(videoId) {
        return this.data.videoProgress[videoId] || { progress: 0 };
    }

    // Time tracking
    addTimeSpent(seconds) {
        this.data.totalTimeSpent += seconds;
        this.save();
    }

    getTotalTimeSpent() {
        return this.data.totalTimeSpent;
    }

    getFormattedTimeSpent() {
        const hours = Math.floor(this.data.totalTimeSpent / 3600);
        const minutes = Math.floor((this.data.totalTimeSpent % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }

    // Certificate
    markCertificateGenerated(studentName) {
        this.data.certificateGenerated = true;
        this.data.studentName = studentName;
        this.data.completionDate = new Date().toISOString();
        this.save();
    }

    hasCertificate() {
        return this.data.certificateGenerated;
    }

    // Statistics
    getStatistics() {
        const totalModules = courseData ? courseData.modules.length : 0;
        const videoModules = courseData ? courseData.modules.filter(m => m.type === 'video').length : 0;
        const quizModules = courseData ? courseData.modules.filter(m => m.type === 'quiz').length : 0;

        return {
            totalModules: totalModules,
            completedModules: this.data.completedModules.length,
            completionPercentage: this.getCompletionPercentage(),
            videoModules: videoModules,
            quizModules: quizModules,
            completedQuizzes: Object.keys(this.data.quizScores).length,
            averageQuizScore: this.getAverageQuizScore(),
            totalTimeSpent: this.getFormattedTimeSpent(),
            startDate: this.data.startDate,
            lastAccessed: this.data.lastAccessed,
            daysActive: this.getDaysActive()
        };
    }

    getAverageQuizScore() {
        const scores = Object.values(this.data.quizScores);
        if (scores.length === 0) return 0;
        const sum = scores.reduce((acc, score) => acc + score.percentage, 0);
        return Math.round(sum / scores.length);
    }

    getDaysActive() {
        if (!this.data.startDate) return 0;
        const start = new Date(this.data.startDate);
        const now = new Date();
        const diffTime = Math.abs(now - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Export progress
    exportProgress() {
        const exportData = {
            ...this.data,
            exportDate: new Date().toISOString(),
            courseTitle: courseData ? courseData.course.title : 'Unknown Course'
        };
        return JSON.stringify(exportData, null, 2);
    }

    // Import progress
    importProgress(jsonString) {
        try {
            const importedData = JSON.parse(jsonString);
            this.data = importedData;
            this.save();
            return true;
        } catch (e) {
            console.error('Error importing progress:', e);
            return false;
        }
    }
}

// ===================================
// INITIALIZE PROGRESS TRACKER
// ===================================
const progressTracker = new ProgressTracker();

// ===================================
// TIME TRACKING
// ===================================
let sessionStartTime = Date.now();
let timeTrackingInterval = null;

function startTimeTracking() {
    sessionStartTime = Date.now();
    
    // Update time every minute
    timeTrackingInterval = setInterval(() => {
        const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
        progressTracker.addTimeSpent(60); // Add 1 minute
    }, 60000);
}

function stopTimeTracking() {
    if (timeTrackingInterval) {
        clearInterval(timeTrackingInterval);
        const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
        progressTracker.addTimeSpent(sessionTime);
    }
}

// Start tracking when page loads
window.addEventListener('load', startTimeTracking);

// Stop tracking when page unloads
window.addEventListener('beforeunload', stopTimeTracking);

// ===================================
// PROGRESS VISUALIZATION
// ===================================
function showProgressDashboard() {
    const stats = progressTracker.getStatistics();
    
    const dashboard = `
        <div class="progress-dashboard">
            <h2>Your Progress Dashboard</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-chart-line"></i>
                    <h3>${stats.completionPercentage}%</h3>
                    <p>Course Completion</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-check-circle"></i>
                    <h3>${stats.completedModules} / ${stats.totalModules}</h3>
                    <p>Modules Completed</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-clipboard-check"></i>
                    <h3>${stats.completedQuizzes} / ${stats.quizModules}</h3>
                    <p>Quizzes Passed</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-star"></i>
                    <h3>${stats.averageQuizScore}%</h3>
                    <p>Average Quiz Score</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-clock"></i>
                    <h3>${stats.totalTimeSpent}</h3>
                    <p>Time Spent Learning</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-calendar"></i>
                    <h3>${stats.daysActive}</h3>
                    <p>Days Active</p>
                </div>
            </div>
        </div>
    `;
    
    return dashboard;
}

// ===================================
// ACHIEVEMENT SYSTEM
// ===================================
const achievements = [
    {
        id: 'first_video',
        name: 'Getting Started',
        description: 'Complete your first video',
        icon: 'fa-play',
        condition: () => progressTracker.data.completedModules.filter(i => 
            courseData.modules[i].type === 'video'
        ).length >= 1
    },
    {
        id: 'first_quiz',
        name: 'Quiz Master',
        description: 'Pass your first quiz',
        icon: 'fa-clipboard-check',
        condition: () => Object.keys(progressTracker.data.quizScores).length >= 1
    },
    {
        id: 'all_videos',
        name: 'Video Enthusiast',
        description: 'Complete all video modules',
        icon: 'fa-video',
        condition: () => {
            const videoModules = courseData.modules
                .map((m, i) => ({ module: m, index: i }))
                .filter(({ module }) => module.type === 'video');
            return videoModules.every(({ index }) => 
                progressTracker.data.completedModules.includes(index)
            );
        }
    },
    {
        id: 'perfect_score',
        name: 'Perfect Score',
        description: 'Get 100% on any quiz',
        icon: 'fa-trophy',
        condition: () => Object.values(progressTracker.data.quizScores)
            .some(score => score.percentage === 100)
    },
    {
        id: 'course_complete',
        name: 'Course Champion',
        description: 'Complete the entire course',
        icon: 'fa-graduation-cap',
        condition: () => progressTracker.getCompletionPercentage() === 100
    },
    {
        id: 'speed_learner',
        name: 'Speed Learner',
        description: 'Complete the course in under 5 hours',
        icon: 'fa-bolt',
        condition: () => progressTracker.getCompletionPercentage() === 100 && 
            progressTracker.data.totalTimeSpent < 18000
    }
];

function checkAchievements() {
    const unlockedAchievements = achievements.filter(achievement => 
        achievement.condition()
    );
    
    return unlockedAchievements;
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-content">
            <i class="fas ${achievement.icon}"></i>
            <div>
                <h4>Achievement Unlocked!</h4>
                <p><strong>${achievement.name}</strong></p>
                <p>${achievement.description}</p>
            </div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// ===================================
// PROGRESS EXPORT/IMPORT
// ===================================
function downloadProgress() {
    const progressData = progressTracker.exportProgress();
    const blob = new Blob([progressData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `uav_course_progress_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Progress exported successfully!', 'success');
}

function uploadProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const success = progressTracker.importProgress(event.target.result);
            if (success) {
                showNotification('Progress imported successfully!', 'success');
                location.reload();
            } else {
                showNotification('Failed to import progress', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ===================================
// PROGRESS MILESTONES
// ===================================
function checkMilestones() {
    const percentage = progressTracker.getCompletionPercentage();
    const milestones = [25, 50, 75, 100];
    
    milestones.forEach(milestone => {
        const key = `milestone_${milestone}`;
        if (percentage >= milestone && !localStorage.getItem(key)) {
            localStorage.setItem(key, 'true');
            showMilestoneNotification(milestone);
        }
    });
}

function showMilestoneNotification(percentage) {
    const messages = {
        25: "Great start! You're 25% through the course! 🚀",
        50: "Halfway there! Keep up the excellent work! 💪",
        75: "Almost done! You're 75% complete! 🎯",
        100: "Congratulations! You've completed the course! 🎉"
    };
    
    showNotification(messages[percentage], 'success');
}

// ===================================
// LEARNING STREAK
// ===================================
function updateLearningStreak() {
    const today = new Date().toDateString();
    const lastAccess = progressTracker.data.lastAccessed 
        ? new Date(progressTracker.data.lastAccessed).toDateString() 
        : null;
    
    if (!progressTracker.data.streak) {
        progressTracker.data.streak = {
            current: 1,
            longest: 1,
            lastDate: today
        };
    } else if (lastAccess !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastAccess === yesterdayStr) {
            // Continue streak
            progressTracker.data.streak.current++;
            progressTracker.data.streak.longest = Math.max(
                progressTracker.data.streak.longest,
                progressTracker.data.streak.current
            );
        } else {
            // Streak broken
            progressTracker.data.streak.current = 1;
        }
        
        progressTracker.data.streak.lastDate = today;
    }
    
    progressTracker.save();
}

// Update streak on page load
window.addEventListener('load', updateLearningStreak);

// ===================================
// PROGRESS ANALYTICS
// ===================================
function getProgressAnalytics() {
    const stats = progressTracker.getStatistics();
    const quizScores = Object.values(progressTracker.data.quizScores);
    
    return {
        overview: stats,
        quizPerformance: {
            totalQuizzes: quizScores.length,
            averageScore: stats.averageQuizScore,
            highestScore: quizScores.length > 0 
                ? Math.max(...quizScores.map(q => q.percentage)) 
                : 0,
            lowestScore: quizScores.length > 0 
                ? Math.min(...quizScores.map(q => q.percentage)) 
                : 0,
            passRate: quizScores.length > 0
                ? Math.round((quizScores.filter(q => q.passed).length / quizScores.length) * 100)
                : 0
        },
        timeAnalysis: {
            totalTime: stats.totalTimeSpent,
            averageTimePerModule: progressTracker.data.completedModules.length > 0
                ? Math.round(progressTracker.data.totalTimeSpent / progressTracker.data.completedModules.length / 60)
                : 0,
            estimatedTimeRemaining: stats.completionPercentage < 100
                ? Math.round((progressTracker.data.totalTimeSpent / stats.completionPercentage) * (100 - stats.completionPercentage) / 60)
                : 0
        },
        achievements: checkAchievements(),
        streak: progressTracker.data.streak || { current: 0, longest: 0 }
    };
}

// Log progress system loaded
console.log('%c📊 Progress Tracking System Loaded', 'color: #28a745; font-weight: bold;');
console.log('Progress:', progressTracker.getCompletionPercentage() + '%');
