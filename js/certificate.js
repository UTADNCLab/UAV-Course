// ===================================
// CERTIFICATE GENERATION SYSTEM
// ===================================

// ===================================
// GENERATE CUMULATIVE CERTIFICATE
// ===================================
function generateCumulativeCertificate() {
    const user = window.authFunctions ? window.authFunctions.currentUser() : null;
    if (!user) {
        showNotification('Please login to generate certificate', 'error');
        return;
    }

    const userName = user.name || 'Student';
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Get all quiz scores (per-user)
    const email = user.email ? user.email.toLowerCase() : 'guest';
    const quizKey = `uav_course_quiz_scores_${email}`;
    const quizScores = JSON.parse(localStorage.getItem(quizKey) || '{}');
    
    // Get completed modules (per-user)
    const progressKey = `uav_course_progress_${email}`;
    const completed = JSON.parse(localStorage.getItem(progressKey) || '[]');
    
    // Module pairs: video index and quiz ID
    // Module 1: video index 0, quiz index 1
    // Module 2: video index 2, quiz index 3
    // Module 3: video index 4, quiz index 5
    // Module 4: video index 6, quiz index 7
    const pairs = [
        { videoIndex: 0, quizId: 'quiz-1', name: 'Open Airborne Computing Platforms' },
        { videoIndex: 2, quizId: 'quiz-2', name: 'UAV Communications and Networking' },
        { videoIndex: 4, quizId: 'quiz-3', name: 'Networked Control and Co-Design' },
        { videoIndex: 6, quizId: 'quiz-4', name: 'Airborne Computing and AI' }
    ];
    
    const completedModules = [];
    
    pairs.forEach(pair => {
        const videoDone = completed.includes(pair.videoIndex);
        const quiz = quizScores[pair.quizId];
        const quizOk = quiz && quiz.percentage >= 80;
        
        // Module is eligible ONLY if BOTH video is completed AND quiz score >= 80%
        if (videoDone && quizOk) {
            completedModules.push({
                name: pair.name,
                score: quiz.percentage
            });
        }
    });
    
    if (completedModules.length === 0) {
        showNotification('Complete quizzes with 80%+ to earn certificate', 'info');
        return;
    }
    
    // Calculate average score
    const averageScore = Math.round(
        completedModules.reduce((sum, m) => sum + m.score, 0) / completedModules.length
    );
    
    // Create modules list HTML - simple and compact
    const modulesListHTML = completedModules.map(m => `
        <div style="padding: 8px 12px; background: #f0f9ff; border-left: 3px solid #0064A4; margin: 5px 0; border-radius: 3px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #333; font-weight: 500;">✓ ${m.name}</span>
            <span style="font-size: 14px; color: #0064A4; font-weight: bold; margin-left: 15px;">${m.score}%</span>
        </div>
    `).join('');

    // Create modules grid HTML - 2x2 layout without percentages
    const modulesGridHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 700px; margin: 15px auto;">
            ${completedModules.map(m => `
                <div style="text-align: center; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                    <div style="font-size: 14px; color: #333;">✓ ${m.name}</div>
                </div>
            `).join('')}
        </div>
    `;

    // Create certificate HTML - matching physical certificate design
    const certificateHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate of Completion</title>
            <style>
                @page {
                    size: A4 landscape;
                    margin: 0;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: Arial, sans-serif;
                    background: #f5f5f5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                }
                
                .certificate-container {
                    width: 297mm;
                    height: 210mm;
                    background: white;
                    padding: 40px 60px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    position: relative;
                }
                
                .certificate-border {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border: 4px solid #B8860B;
                    pointer-events: none;
                }
                
                .certificate-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 30px 20px 10px 20px;
                }
                
                .decorative-top {
                    position: absolute;
                    top: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 200px;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #B8860B, transparent);
                }
                
                .decorative-top::before,
                .decorative-top::after {
                    content: '✦';
                    position: absolute;
                    top: -7px;
                    font-size: 18px;
                    color: #B8860B;
                }
                
                .decorative-top::before {
                    left: -25px;
                }
                
                .decorative-top::after {
                    right: -25px;
                }
                
                .cert-title {
                    font-size: 40px;
                    font-weight: bold;
                    color: #000;
                    margin: 0 0 8px 0;
                    letter-spacing: 2px;
                }
                
                .cert-subtitle {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 12px;
                }
                
                .cert-text {
                    font-size: 14px;
                    color: #333;
                    margin: 6px 0;
                }
                
                .recipient-name {
                    font-size: 36px;
                    font-weight: bold;
                    color: #000;
                    margin: 10px 0;
                    text-transform: uppercase;
                }
                
                .course-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #000;
                    margin: 8px 0 12px 0;
                    line-height: 1.3;
                }
                
                .signatures-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 30px;
                    margin-top: 0;
                    padding: 0 20px;
                    margin-bottom: 10px;
                }
                
                .signature-block {
                    text-align: center;
                }
                
                .signature-line {
                    width: 140px;
                    border-top: 1.5px solid #000;
                    margin: 0 auto 5px;
                }
                
                .signature-name {
                    font-size: 11px;
                    font-weight: bold;
                    color: #000;
                    margin-bottom: 2px;
                }
                
                .signature-title {
                    font-size: 9px;
                    color: #666;
                    line-height: 1.2;
                }
                
                .nsf-logo {
                    position: absolute;
                    bottom: 25px;
                    right: 40px;
                    width: 50px;
                    height: 50px;
                }
                
                .cert-date {
                    position: absolute;
                    top: 25px;
                    left: 35px;
                    font-size: 11px;
                    color: #666;
                }
                
                .uav-icon {
                    position: absolute;
                    top: 25px;
                    right: 35px;
                    font-size: 45px;
                    color: #B8860B;
                    opacity: 0.3;
                }
                
                @media print {
                    body {
                        background: white;
                        padding: 0;
                    }
                    
                    .certificate-container {
                        box-shadow: none;
                        page-break-after: always;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                }
                
                .print-buttons {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    display: flex;
                    gap: 10px;
                }
                
                .print-btn {
                    padding: 12px 24px;
                    background: #0064A4;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    transition: all 0.3s;
                }
                
                .print-btn:hover {
                    background: #003366;
                    transform: translateY(-2px);
                }
                
                .print-btn.secondary {
                    background: #F47E3C;
                }
                
                .print-btn.secondary:hover {
                    background: #d66a2a;
                }
                
                @media print {
                    body {
                        background: white;
                        padding: 0;
                    }
                    
                    .certificate-container {
                        box-shadow: none;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-buttons no-print">
                <button class="print-btn" onclick="window.print()">
                    <i class="fas fa-print"></i> Print Certificate
                </button>
                <button class="print-btn secondary" onclick="window.close()">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
            
            <div class="certificate-container">
                <div class="certificate-border">
                    <!-- Date (top left, inside border) -->
                    <div class="cert-date">Date Issued: ${currentDate}</div>
                    
                    <!-- UAV Icon (top right, inside border) -->
                    <div class="uav-icon">✈</div>
                    
                    <!-- Decorative top design -->
                    <div class="decorative-top"></div>
                </div>
                
                <div class="certificate-content">
                    <div>
                        <h1 class="cert-title">CERTIFICATE OF COMPLETION</h1>
                        <p class="cert-subtitle">This Award Certifies That</p>
                        
                        <h2 class="recipient-name">${userName}</h2>
                        
                        <p class="cert-text">Has Successfully Completed Training On</p>
                        
                        <h3 class="course-title">UNMANNED AERIAL SYSTEM CYBER INFRASTRUCTURE</h3>
                        
                        ${modulesGridHTML}
                    </div>
                    
                    <div class="signatures-container">
                        <div class="signature-block">
                            <div class="signature-line"></div>
                            <p class="signature-name">Yan Wan</p>
                            <p class="signature-title">Distinguished University Professor<br>Electrical Engineering, UTA</p>
                        </div>
                        
                        <div class="signature-block">
                            <div class="signature-line"></div>
                            <p class="signature-name">Junfei Xie</p>
                            <p class="signature-title">Professor<br>Electrical & Computer Engineering, SDSU</p>
                        </div>
                        
                        <div class="signature-block">
                            <div class="signature-line"></div>
                            <p class="signature-name">Kejie Lu</p>
                            <p class="signature-title">Professor<br>Computer Science & Engineering, UPRM</p>
                        </div>
                        
                        <div class="signature-block">
                            <div class="signature-line"></div>
                            <p class="signature-name">Shengli Fu</p>
                            <p class="signature-title">Professor<br>Electrical Engineering, UNT</p>
                        </div>
                    </div>
                </div>
                
                <!-- NSF Logo (bottom right) -->
                <div class="nsf-logo">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="#003f87" stroke="#003f87" stroke-width="2"/>
                        <text x="50" y="60" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle">NSF</text>
                    </svg>
                </div>
            </div>
        </body>
        </html>
    `;

    // Open certificate in new window
    const certificateWindow = window.open('', '_blank');
    if (certificateWindow) {
        certificateWindow.document.write(certificateHTML);
        certificateWindow.document.close();
        showNotification('Certificate opened in new window!', 'success');
    } else {
        showNotification('Please allow popups to view certificate', 'error');
    }
}

console.log('%c🎓 Certificate System Loaded', 'color: #F47E3C; font-weight: bold;');
