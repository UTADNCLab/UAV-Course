// ===================================
// CERTIFICATE GENERATION SYSTEM
// ===================================

// ===================================
// SHOW THANK YOU MESSAGE BEFORE CERTIFICATE
// ===================================
function showThankYouBeforeCertificate() {
    const user = window.authFunctions ? window.authFunctions.currentUser() : null;
    if (!user) {
        showNotification('Please login to generate certificate', 'error');
        return;
    }

    // Get completed module count
    const email = user.email ? user.email.toLowerCase() : 'guest';
    const quizKey = `uav_course_quiz_scores_${email}`;
    const quizScores = JSON.parse(localStorage.getItem(quizKey) || '{}');
    const progressKey = `uav_course_progress_${email}`;
    const completed = JSON.parse(localStorage.getItem(progressKey) || '[]');
    
    // Count eligible modules (both video AND quiz with 80%+)
    const pairs = [
        { videoIndex: 0, quizId: 'quiz-1' },
        { videoIndex: 2, quizId: 'quiz-2' },
        { videoIndex: 4, quizId: 'quiz-3' },
        { videoIndex: 6, quizId: 'quiz-4' }
    ];
    
    let completedCount = 0;
    pairs.forEach(pair => {
        const videoDone = completed.includes(pair.videoIndex);
        const quiz = quizScores[pair.quizId];
        const quizOk = quiz && quiz.percentage >= 80;
        if (videoDone && quizOk) {
            completedCount++;
        }
    });
    
    const totalModules = 4;
    const moduleText = completedCount === totalModules 
        ? 'all modules' 
        : `${completedCount}/${totalModules} modules`;

    // Create thank you modal
    const thankYouModal = document.createElement('div');
    thankYouModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    thankYouModal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #0064A4 0%, #4A7BA7 100%);
            padding: 50px 60px;
            border-radius: 15px;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            animation: slideIn 0.4s ease-out;
        ">
            <div style="font-size: 60px; margin-bottom: 20px;">🎓</div>
            <h2 style="color: white; font-size: 32px; margin-bottom: 20px; font-weight: bold;">
                Congratulations!
            </h2>
            <p style="color: #e3f2fd; font-size: 18px; line-height: 1.6; margin-bottom: 30px;">
                Thank you for completing ${moduleText}! Your dedication to learning UAV technology is commendable. 
                Your certificate is ready to view and download.
            </p>
            <button onclick="proceedToCertificate()" style="
                background: white;
                color: #0064A4;
                border: none;
                padding: 15px 40px;
                font-size: 18px;
                font-weight: bold;
                border-radius: 8px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.3)'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.2)'">
                View Certificate →
            </button>
        </div>
        <style>
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `;

    document.body.appendChild(thankYouModal);
}

// ===================================
// PROCEED TO CERTIFICATE (AFTER THANK YOU)
// ===================================
function proceedToCertificate() {
    // Remove thank you modal
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
    
    // Now generate the actual certificate
    generateCumulativeCertificate();
}

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
    
    // Create modules list - 2 COLUMNS with LARGER font
    const modulesGridHTML = `
        <div style="margin: 45px auto 0; max-width: 900px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px 50px; text-align: left;">
            ${completedModules.map(m => `
                <div style="padding-left: 0;">
                    <span style="font-size: 22px; color: #333; font-weight: 500;">✓ ${m.name}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Create certificate HTML - LANDSCAPE OPTIMIZED
    const certificateHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate of Completion - ${userName}</title>
            <style>
                /* FORCE LANDSCAPE ORIENTATION */
                @page {
                    size: A4 landscape;
                    margin: 0;
                }
                
                @media print {
                    @page {
                        size: landscape;
                    }
                    
                    html, body {
                        width: 297mm;
                        height: 210mm;
                    }
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                html {
                    width: 100%;
                    height: 100%;
                }
                
                body {
                    font-family: 'Arial', 'Helvetica', sans-serif;
                    background: #e8e8e8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                    width: 100%;
                    overflow-x: auto;
                }
                
                /* LANDSCAPE CONTAINER - FIXED DIMENSIONS */
                .certificate-container {
                    width: 297mm;
                    height: 210mm;
                    min-width: 297mm;
                    min-height: 210mm;
                    max-width: 297mm;
                    max-height: 210mm;
                    background: white;
                    padding: 35px 50px;
                    box-shadow: 0 10px 50px rgba(0,0,0,0.3);
                    position: relative;
                    display: block;
                }
                
                /* GOLD BORDER */
                .certificate-border {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    right: 15px;
                    bottom: 15px;
                    border: 5px solid #B8860B;
                    pointer-events: none;
                    z-index: 1;
                }
                
                /* CONTENT LAYOUT */
                .certificate-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 45px 30px 25px 30px;
                }
                
                /* DATE - TOP LEFT */
                .cert-date {
                    position: absolute;
                    top: 22px;
                    left: 28px;
                    font-size: 12px;
                    color: #555;
                    z-index: 3;
                }
                
                /* UAV ICON - TOP RIGHT */
                .uav-icon {
                    position: absolute;
                    top: 18px;
                    right: 28px;
                    font-size: 50px;
                    color: #B8860B;
                    opacity: 0.4;
                    z-index: 3;
                }
                
                /* MAIN TITLE - LARGER */
                .cert-title {
                    font-size: 54px;
                    font-weight: bold;
                    color: #000;
                    margin: 0 0 18px 0;
                    letter-spacing: 5px;
                    line-height: 1.1;
                }
                
                /* SUBTITLE - LARGER AND MOVED DOWN */
                .cert-subtitle {
                    font-size: 22px;
                    color: #444;
                    margin-bottom: 22px;
                    font-weight: normal;
                }
                
                /* RECIPIENT NAME - MUCH LARGER */
                .recipient-name {
                    font-size: 56px;
                    font-weight: bold;
                    color: #4A7BA7;
                    margin: 22px 0;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }
                
                /* COMPLETION TEXT - LARGER */
                .cert-text {
                    font-size: 20px;
                    color: #444;
                    margin: 18px 0;
                    font-weight: 500;
                }
                
                /* COURSE TITLE - EVEN LARGER WITH BETTER FONT */
                .course-title {
                    font-size: 32px;
                    font-weight: bold;
                    color: #000;
                    margin: 18px 0 25px 0;
                    line-height: 1.4;
                    letter-spacing: 2px;
                    font-family: 'Georgia', 'Times New Roman', serif;
                }
                
                /* MODULES SECTION - MORE SPACING */
                .modules-section {
                    margin: 35px 0 0 0;
                }
                
                /* SIGNATURES - 4 COLUMNS IN LANDSCAPE */
                .signatures-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 25px;
                    margin-top: 0;
                    padding: 0 20px;
                }
                
                .signature-block {
                    text-align: center;
                }
                
                .signature-line {
                    width: 150px;
                    border-top: 2px solid #000;
                    margin: 0 auto 6px;
                }
                
                .signature-name {
                    font-size: 12px;
                    font-weight: bold;
                    color: #000;
                    margin-bottom: 3px;
                }
                
                .signature-title {
                    font-size: 10px;
                    color: #666;
                    line-height: 1.3;
                }
                
                /* NSF LOGO - BOTTOM RIGHT */
                .nsf-logo {
                    position: absolute;
                    bottom: 22px;
                    right: 35px;
                    width: 55px;
                    height: 55px;
                    z-index: 3;
                }
                
                /* PRINT BUTTON - SINGLE BUTTON ONLY */
                .print-buttons {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                
                .print-btn {
                    padding: 14px 28px;
                    background: #0064A4;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 16px;
                    font-weight: bold;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.25);
                    transition: all 0.3s ease;
                }
                
                .print-btn:hover {
                    background: #004d80;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
                }
                
                /* PRINT STYLES */
                @media print {
                    html, body {
                        width: 297mm;
                        height: 210mm;
                        margin: 0;
                        padding: 0;
                        background: white;
                    }
                    
                    body {
                        display: block;
                        padding: 0;
                    }
                    
                    .certificate-container {
                        box-shadow: none;
                        margin: 0;
                        page-break-after: always;
                        width: 297mm;
                        height: 210mm;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                }
                
                /* RESPONSIVE - SCALE DOWN ON SMALLER SCREENS */
                @media screen and (max-width: 1200px) {
                    body {
                        padding: 10px;
                    }
                    
                    .certificate-container {
                        transform: scale(0.8);
                        transform-origin: center;
                    }
                }
                
                @media screen and (max-width: 900px) {
                    .certificate-container {
                        transform: scale(0.6);
                    }
                    
                    .print-buttons {
                        top: 10px;
                        right: 10px;
                    }
                    
                    .print-btn {
                        padding: 10px 20px;
                        font-size: 14px;
                    }
                }
            </style>
        </head>
        <body>
            <!-- PRINT BUTTON - SINGLE BUTTON ONLY -->
            <div class="print-buttons no-print">
                <button class="print-btn" onclick="window.print()">
                    🖨️ Print Certificate
                </button>
            </div>
            
            <!-- CERTIFICATE -->
            <div class="certificate-container">
                <!-- GOLD BORDER -->
                <div class="certificate-border">
                    <!-- DATE (TOP LEFT) -->
                    <div class="cert-date">Date Issued: ${currentDate}</div>
                    
                    <!-- UAV ICON (TOP RIGHT) -->
                    <div class="uav-icon">✈</div>
                </div>
                
                <!-- MAIN CONTENT -->
                <div class="certificate-content">
                    <!-- TOP SECTION -->
                    <div>
                        <h1 class="cert-title">CERTIFICATE OF COMPLETION</h1>
                        <p class="cert-subtitle">This Award Certifies That</p>
                        
                        <h2 class="recipient-name">${userName}</h2>
                        
                        <p class="cert-text">Has Successfully Completed Training On</p>
                        
                        <h3 class="course-title">UAV DESIGN: FOUNDATIONS OF CYBER-PHYSICAL SYSTEMS</h3>
                        
                        <!-- MODULES -->
                        <div class="modules-section">
                            ${modulesGridHTML}
                        </div>
                    </div>
                    
                    <!-- SIGNATURES SECTION -->
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
                
                <!-- NSF LOGO (BOTTOM RIGHT) - COMMENTED OUT FOR NOW -->
                <!-- Uncomment this section when you want to display the NSF logo
                <div class="nsf-logo">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="#003f87" stroke="#003f87" stroke-width="2"/>
                        <text x="50" y="62" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="white" text-anchor="middle">NSF</text>
                    </svg>
                </div>
                -->
            </div>
        </body>
        </html>
    `;

    // Open certificate in new window
    const certificateWindow = window.open('', '_blank', 'width=1200,height=900');
    if (certificateWindow) {
        certificateWindow.document.write(certificateHTML);
        certificateWindow.document.close();
        showNotification('Certificate opened! Ensure "Landscape" is selected when printing.', 'success');
    } else {
        showNotification('Please allow popups to view certificate', 'error');
    }
}

console.log('%c🎓 Certificate System Loaded - Landscape Optimized', 'color: #F47E3C; font-weight: bold;');
