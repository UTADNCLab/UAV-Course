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
    const passed = percentage >= 70;
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
        } else if (passed) {
            scoreMessage.textContent = '✓ Good job! Score 80%+ to earn a certificate.';
            scoreMessage.className = 'score-message';
        } else {
            scoreMessage.textContent = '📚 Keep practicing! You need 70%+ to pass.';
            scoreMessage.className = 'score-message retry';
        }
    }

    // Save quiz score to localStorage
    saveQuizScore(currentModuleIndex, percentage, quizScore, totalQuestions);

    if (passed) {
        // Mark quiz as complete
        completedModules.add(currentModuleIndex);
        
        // Also mark the previous video module as complete (if not already)
        // Video modules are at even indices (0, 2, 4, 6), quizzes at odd indices (1, 3, 5, 7)
        if (currentModuleIndex > 0 && currentModuleIndex % 2 === 1) {
            const videoModuleIndex = currentModuleIndex - 1;
            completedModules.add(videoModuleIndex);
        }
        
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
    } else if (passed) {
        showNotification('Quiz passed! Score 80%+ to earn a certificate.', 'success');
    } else {
        showNotification('Keep trying! Review the material and retry.', 'info');
    }
}

// ===================================
// SAVE QUIZ SCORE
// ===================================
function saveQuizScore(quizIndex, percentage, score, total) {
    const quizScores = JSON.parse(localStorage.getItem('uav_course_quiz_scores') || '{}');
    
    // Map module indices to quiz IDs for backend compatibility
    // Module indices: 1, 3, 5, 7 -> Quiz IDs: quiz-1, quiz-2, quiz-3, quiz-4
    const quizIdMap = {
        1: 'quiz-1',
        3: 'quiz-2',
        5: 'quiz-3',
        7: 'quiz-4'
    };
    
    const quizId = quizIdMap[quizIndex] || `quiz-${quizIndex}`;
    
    // Store the score with quiz ID as key
    quizScores[quizId] = {
        quizId: quizId,
        percentage: percentage,
        score: score,
        total: total,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('uav_course_quiz_scores', JSON.stringify(quizScores));
    
    // Also trigger progress update to backend
    if (window.authFunctions && window.authFunctions.currentUser()) {
        window.authFunctions.sendProgressUpdate('quiz_complete');
    }
}

// ===================================
// COMPLETE QUIZ
// ===================================
function completeQuiz() {
    // Move to next module
    nextModule();
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
