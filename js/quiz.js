
// ===================================
// QUIZ VARIABLES
// ===================================
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = [];

// ===================================
// LOAD QUIZ MODULE
// ===================================
function loadQuizModule(module) {
    document.getElementById('quizSection').style.display = 'block';

    // Set quiz information
    document.getElementById('quizTitle').textContent = module.title;

    // Store current quiz
    currentQuiz = module;

    // Reset quiz state
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];

    // Show intro, hide content and results
    document.getElementById('quizIntro').style.display = 'block';
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
}

// ===================================
// START QUIZ
// ===================================
function startQuiz() {
    document.getElementById('quizIntro').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    
    loadQuestion();
}

// ===================================
// LOAD QUESTION
// ===================================
function loadQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
        showQuizResults();
        return;
    }

    const question = currentQuiz.questions[currentQuestionIndex];
    
    // Update progress
    document.getElementById('questionNumber').textContent = 
        `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;

    // Display question
    document.getElementById('questionText').textContent = question.question;

    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });

    // Hide next button
    document.getElementById('nextQuestionBtn').style.display = 'none';
}

// ===================================
// SELECT ANSWER
// ===================================
function selectAnswer(selectedIndex) {
    const question = currentQuiz.questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
        option.onclick = null;
    });

    // Mark selected option
    options[selectedIndex].classList.add('selected');

    // Check if correct
    const isCorrect = selectedIndex === question.correctAnswer;
    
    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        quizScore++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correctAnswer].classList.add('correct');
    }

    // Store answer
    quizAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedAnswer: selectedIndex,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect
    });

    // Show next button
    document.getElementById('nextQuestionBtn').style.display = 'inline-flex';
    
    // Show notification with explanation
    const icon = isCorrect ? '✓' : '✗';
    const title = isCorrect ? 'Correct!' : 'Incorrect';
    showNotification(`${icon} ${title} - ${question.explanation}`, isCorrect ? 'success' : 'error');
}

// ===================================
// NEXT QUESTION
// ===================================
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuiz.questions.length) {
        loadQuestion();
    } else {
        showQuizResults();
    }
}

// ===================================
// SHOW QUIZ RESULTS
// ===================================
function showQuizResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';

    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((quizScore / totalQuestions) * 100);
    const passed = percentage >= 80;
    const certificateEligible = percentage >= 80;

    // Update results display
    document.getElementById('scoreDisplay').textContent = `${quizScore}/${totalQuestions} (${percentage}%)`;
    document.getElementById('resultsTitle').textContent = passed ? 
        `Congratulations! You Passed! 🎉` : 
        `Not Quite There Yet`;

    // Update score message
    const scoreMessage = document.getElementById('scoreMessage');
    if (scoreMessage) {
        if (certificateEligible) {
            scoreMessage.textContent = '🎓 Excellent! You earned a certificate for this module!';
            scoreMessage.className = 'score-message success';
        } else {
            scoreMessage.textContent = '📚 Keep practicing! You need 80%+ to pass and earn a certificate.';
            scoreMessage.className = 'score-message retry';
        }
    }

    // Save quiz score to localStorage (always save the score)
    saveQuizScore(currentModuleIndex, percentage, quizScore, totalQuestions);

    // Display quiz history
    const historyHTML = displayQuizHistory();
    const quizHistoryContainer = document.getElementById('quizHistoryContainer');
    if (quizHistoryContainer) {
        quizHistoryContainer.innerHTML = historyHTML;
    }

    // Only mark quiz as complete if score is 80% or above
    if (passed) {
        completedModules.add(currentModuleIndex);
        saveProgress();
        updateProgress();
        loadModulesList();
    } else {
        completedModules.delete(currentModuleIndex);
        saveProgress();
        updateProgress();
        loadModulesList();
    }

    // Update certificate section
    if (window.updateCertificateSection) {
        updateCertificateSection();
    }

    // Scroll to top of results
    document.getElementById('quizResults').scrollIntoView({ behavior: 'smooth' });

    // Show notification
    if (certificateEligible) {
        showNotification('Quiz passed with 80%+! Certificate earned! 🎉', 'success');
    } else {
        showNotification(`Score: ${percentage}%. You need 80%+ to pass. Try again!`, 'info');
    }
}

// ===================================
// SAVE QUIZ SCORE WITH HISTORY
// ===================================
function saveQuizScore(quizIndex, percentage, score, total) {
    // Get current user for per-user storage
    const user = window.authFunctions ? window.authFunctions.currentUser() : null;
    const key = user?.email ? `uav_course_quiz_scores_${user.email.toLowerCase()}` : 'uav_course_quiz_scores_guest';
    const historyKey = user?.email ? `uav_course_quiz_history_${user.email.toLowerCase()}` : 'uav_course_quiz_history_guest';
    
    const quizScores = JSON.parse(localStorage.getItem(key) || '{}');
    const quizHistory = JSON.parse(localStorage.getItem(historyKey) || '{}');
    
    // Map module indices to quiz IDs for backend compatibility
    const quizIdMap = {
        1: 'quiz-1',
        3: 'quiz-2',
        5: 'quiz-3',
        7: 'quiz-4'
    };
    
    const quizId = quizIdMap[quizIndex] || `quiz-${quizIndex}`;
    
    // Store the BEST score (for progress tracking)
    if (!quizScores[quizId] || percentage > quizScores[quizId].percentage) {
        quizScores[quizId] = {
            quizId: quizId,
            percentage: percentage,
            score: score,
            total: total,
            date: new Date().toISOString()
        };
        localStorage.setItem(key, JSON.stringify(quizScores));
    }
    
    // Store ALL attempts in history
    if (!quizHistory[quizId]) {
        quizHistory[quizId] = [];
    }
    
    quizHistory[quizId].push({
        attemptNumber: quizHistory[quizId].length + 1,
        percentage: percentage,
        score: score,
        total: total,
        date: new Date().toISOString(),
        passed: percentage >= 80
    });
    
    localStorage.setItem(historyKey, JSON.stringify(quizHistory));
    
    console.log(`Quiz score saved for ${user?.email || 'guest'}: ${quizId} = ${percentage}% (Attempt #${quizHistory[quizId].length})`);
    
    // Also trigger progress update to backend
    if (window.authFunctions && window.authFunctions.currentUser()) {
        window.authFunctions.sendProgressUpdate('quiz_complete');
    }
}

// ===================================
// GET QUIZ HISTORY
// ===================================
function getQuizHistory(quizIndex) {
    const user = window.authFunctions ? window.authFunctions.currentUser() : null;
    const historyKey = user?.email ? `uav_course_quiz_history_${user.email.toLowerCase()}` : 'uav_course_quiz_history_guest';
    const quizHistory = JSON.parse(localStorage.getItem(historyKey) || '{}');
    
    const quizIdMap = {
        1: 'quiz-1',
        3: 'quiz-2',
        5: 'quiz-3',
        7: 'quiz-4'
    };
    
    const quizId = quizIdMap[quizIndex] || `quiz-${quizIndex}`;
    return quizHistory[quizId] || [];
}

// ===================================
// DISPLAY QUIZ HISTORY
// ===================================
function displayQuizHistory() {
    const history = getQuizHistory(currentModuleIndex);
    
    if (history.length === 0) {
        return ''; // No history to display
    }
    
    // Find best score
    const bestScore = Math.max(...history.map(h => h.percentage));
    
    let historyHTML = `
        <div class="quiz-history-section">
            <h3><i class="fas fa-history"></i> Your Quiz History</h3>
            <p class="history-subtitle">Track your progress across all attempts</p>
            <div class="quiz-history-table">
                <table>
                    <thead>
                        <tr>
                            <th>Attempt</th>
                            <th>Score</th>
                            <th>Percentage</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    // Display attempts in reverse order (newest first)
    history.slice().reverse().forEach((attempt) => {
        const isBest = attempt.percentage === bestScore;
        const statusIcon = attempt.passed ? '✓' : '✗';
        const statusClass = attempt.passed ? 'passed' : 'failed';
        const bestBadge = isBest ? '<span class="best-badge">🏆 Best</span>' : '';
        const date = new Date(attempt.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        historyHTML += `
            <tr class="${isBest ? 'best-attempt' : ''}">
                <td><strong>#${attempt.attemptNumber}</strong> ${bestBadge}</td>
                <td>${attempt.score}/${attempt.total}</td>
                <td><strong>${attempt.percentage}%</strong></td>
                <td class="status-${statusClass}">${statusIcon} ${attempt.passed ? 'Passed' : 'Failed'}</td>
                <td>${date}</td>
            </tr>
        `;
    });
    
    historyHTML += `
                    </tbody>
                </table>
            </div>
            <div class="history-stats">
                <div class="stat-item">
                    <i class="fas fa-chart-line"></i>
                    <span>Total Attempts: <strong>${history.length}</strong></span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-trophy"></i>
                    <span>Best Score: <strong>${bestScore}%</strong></span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-check-circle"></i>
                    <span>Passed: <strong>${history.filter(h => h.passed).length}</strong></span>
                </div>
            </div>
        </div>
    `;
    
    return historyHTML;
}

// ===================================
// COMPLETE QUIZ
// ===================================
function completeQuiz() {
    // NEVER auto-navigate to certificate - ALWAYS go back to course page (index.html)
    
    // Check if ALL modules are completed (excluding certificate module)
    const totalModules = courseData.modules.filter(m => m.type !== 'certificate').length;
    const completedCount = Array.from(completedModules).filter(i => courseData.modules[i]?.type !== 'certificate').length;
    
    const allModulesCompleted = completedCount === totalModules;
    
    if (allModulesCompleted) {
        // All modules completed - show notification and go to first module
        showNotification('🎉 Congratulations! All modules completed! Click the certificate module to view your certificate.', 'success');
        
        // Go to first module (never certificate)
        setTimeout(() => {
            loadModule(0);
        }, 1500);
    } else {
        // Not all modules completed - find next NON-certificate module
        let nextIndex = currentModuleIndex + 1;
        
        // Skip certificate modules
        while (nextIndex < courseData.modules.length && courseData.modules[nextIndex].type === 'certificate') {
            nextIndex++;
        }
        
        // If we've gone past all modules, wrap back to first module
        if (nextIndex >= courseData.modules.length) {
            nextIndex = 0;
        }
        
        // Load the next non-certificate module
        setTimeout(() => {
            loadModule(nextIndex);
        }, 1000);
        
        // Show remaining modules message
        const remaining = totalModules - completedCount;
        showNotification(`Great job! ${remaining} module${remaining > 1 ? 's' : ''} remaining.`, 'success');
    }
}

// ===================================
// RETRY QUIZ
// ===================================
function retryQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = [];
    
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    
    loadQuestion();
    
    showNotification('Quiz restarted. Good luck! 💪', 'info');
}

// ===================================
// QUIZ STATISTICS
// ===================================
function getQuizStatistics() {
    const quizModules = courseData.modules.filter(m => m.type === 'quiz');
    const completedQuizzes = quizModules.filter((_, index) => 
        completedModules.has(index * 2 + 1)
    ).length;
    
    return {
        total: quizModules.length,
        completed: completedQuizzes,
        percentage: Math.round((completedQuizzes / quizModules.length) * 100)
    };
}

// ===================================
// QUIZ REVIEW MODE
// ===================================
function reviewQuiz() {
    // This function could be extended to show a detailed review
    // of all questions and answers after completion
    console.log('Quiz Review:', quizAnswers);
    
    let reviewHTML = '<div class="quiz-review"><h3>Quiz Review</h3>';
    
    quizAnswers.forEach((answer, index) => {
        const question = currentQuiz.questions[answer.questionIndex];
        reviewHTML += `
            <div class="review-item ${answer.isCorrect ? 'correct' : 'incorrect'}">
                <h4>Question ${index + 1}: ${answer.isCorrect ? '✓' : '✗'}</h4>
                <p><strong>Q:</strong> ${question.question}</p>
                <p><strong>Your Answer:</strong> ${question.options[answer.selectedAnswer]}</p>
                ${!answer.isCorrect ? `<p><strong>Correct Answer:</strong> ${question.options[answer.correctAnswer]}</p>` : ''}
                <p><strong>Explanation:</strong> ${question.explanation}</p>
            </div>
        `;
    });
    
    reviewHTML += '</div>';
    
    return reviewHTML;
}

// ===================================
// QUIZ TIMER (OPTIONAL FEATURE)
// ===================================
let quizTimer = null;
let quizTimeElapsed = 0;

function startQuizTimer() {
    quizTimeElapsed = 0;
    quizTimer = setInterval(() => {
        quizTimeElapsed++;
    }, 1000);
}

function stopQuizTimer() {
    if (quizTimer) {
        clearInterval(quizTimer);
        quizTimer = null;
    }
    return quizTimeElapsed;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===================================
// QUIZ HINTS (OPTIONAL FEATURE)
// ===================================
function showHint(questionIndex) {
    // This could be extended to provide hints for questions
    const question = currentQuiz.questions[questionIndex];
    if (question.hint) {
        alert(`Hint: ${question.hint}`);
    } else {
        alert('No hint available for this question.');
    }
}

// ===================================
// EXPORT QUIZ RESULTS
// ===================================
function exportQuizResults() {
    const results = {
        courseName: courseData.course.title,
        quizTitle: currentQuiz.title,
        date: new Date().toISOString(),
        score: quizScore,
        totalQuestions: currentQuiz.questions.length,
        percentage: Math.round((quizScore / currentQuiz.questions.length) * 100),
        answers: quizAnswers,
        timeElapsed: quizTimeElapsed
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz_results_${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
}

// ===================================
// QUIZ ANALYTICS
// ===================================
function getQuizAnalytics() {
    if (!quizAnswers.length) return null;
    
    const analytics = {
        totalQuestions: currentQuiz.questions.length,
        correctAnswers: quizScore,
        incorrectAnswers: currentQuiz.questions.length - quizScore,
        accuracy: Math.round((quizScore / currentQuiz.questions.length) * 100),
        timePerQuestion: quizTimeElapsed / currentQuiz.questions.length,
        difficultQuestions: quizAnswers
            .filter(a => !a.isCorrect)
            .map(a => currentQuiz.questions[a.questionIndex].question)
    };
    
    return analytics;
}

// Log quiz system loaded
console.log('%c📝 Quiz System Loaded', 'color: #f3722c; font-weight: bold;');
