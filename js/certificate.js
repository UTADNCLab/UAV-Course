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

    // Get all quiz scores
    const quizScores = JSON.parse(localStorage.getItem('uav_course_quiz_scores') || '{}');
    
    // Get eligible modules (80%+)
    const moduleNames = [
        'Open Airborne Computing Platforms',
        'UAV Communications and Networking',
        'Networked Control and Co-Design',
        'Airborne Computing and AI'
    ];
    
    const completedModules = [];
    const quizIds = ['quiz-1', 'quiz-2', 'quiz-3', 'quiz-4'];
    
    quizIds.forEach((quizId, i) => {
        if (quizScores[quizId] && quizScores[quizId].percentage >= 80) {
            completedModules.push({
                name: moduleNames[i],
                score: quizScores[quizId].percentage
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
    
    // Create modules list HTML
    const modulesListHTML = completedModules.map(m => `
        <div style="padding: 12px; background: #f0f9ff; border-left: 4px solid #0064A4; margin: 8px 0; border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 16px; color: #333; font-weight: 500;">✓ ${m.name}</span>
                <span style="font-size: 14px; color: #0064A4; font-weight: bold;">${m.score}%</span>
            </div>
        </div>
    `).join('');

    // Create certificate HTML
    const certificateHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate of Completion - UAV Course</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
                    font-family: 'Georgia', serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    position: relative;
                    overflow: hidden;
                }
                
                .certificate-border {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border: 3px solid #0064A4;
                    pointer-events: none;
                }
                
                .certificate-border::before {
                    content: '';
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    border: 1px solid #F47E3C;
                }
                
                .certificate-content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                
                .certificate-header {
                    margin-top: 20px;
                }
                
                .certificate-logo {
                    font-size: 48px;
                    color: #0064A4;
                    margin-bottom: 10px;
                }
                
                .certificate-title {
                    font-size: 48px;
                    color: #0064A4;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                }
                
                .certificate-subtitle {
                    font-size: 24px;
                    color: #666;
                    margin-bottom: 30px;
                }
                
                .certificate-body {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 20px 0;
                }
                
                .certificate-text {
                    font-size: 20px;
                    color: #333;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }
                
                .recipient-name {
                    font-size: 56px;
                    color: #0064A4;
                    font-weight: bold;
                    margin: 30px 0;
                    font-family: 'Brush Script MT', cursive;
                    text-decoration: underline;
                    text-decoration-color: #F47E3C;
                    text-underline-offset: 10px;
                }
                
                .course-name {
                    font-size: 28px;
                    color: #F47E3C;
                    font-weight: bold;
                    margin: 20px 0;
                    line-height: 1.4;
                }
                
                .achievement-text {
                    font-size: 18px;
                    color: #666;
                    margin: 15px 0;
                }
                
                .score-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    color: white;
                    padding: 10px 30px;
                    border-radius: 50px;
                    font-size: 20px;
                    font-weight: bold;
                    margin: 20px 0;
                    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
                }
                
                .certificate-footer {
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                    margin-top: 40px;
                    padding-top: 20px;
                }
                
                .signature-block {
                    text-align: center;
                    flex: 1;
                }
                
                .signature-line {
                    width: 200px;
                    border-top: 2px solid #333;
                    margin: 0 auto 10px;
                }
                
                .signature-name {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 5px;
                }
                
                .signature-title {
                    font-size: 14px;
                    color: #666;
                }
                
                .certificate-date {
                    font-size: 16px;
                    color: #666;
                    margin-top: 10px;
                }
                
                .certificate-id {
                    position: absolute;
                    bottom: 30px;
                    right: 60px;
                    font-size: 12px;
                    color: #999;
                }
                
                .watermark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(-45deg);
                    font-size: 120px;
                    color: rgba(0, 100, 164, 0.03);
                    font-weight: bold;
                    pointer-events: none;
                    z-index: 0;
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
                    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
                }
                
                .print-btn.secondary {
                    background: #F47E3C;
                }
                
                .print-btn.secondary:hover {
                    background: #d66a2a;
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
                <div class="certificate-border"></div>
                <div class="watermark">UAV COURSE</div>
                
                <div class="certificate-content">
                    <div class="certificate-header">
                        <div class="certificate-logo">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h1 class="certificate-title">Certificate</h1>
                        <p class="certificate-subtitle">of Completion</p>
                    </div>
                    
                    <div class="certificate-body">
                        <p class="certificate-text">This is to certify that</p>
                        
                        <h2 class="recipient-name">${userName}</h2>
                        
                        <p class="certificate-text">has successfully completed the following modules in</p>
                        
                        <h3 class="course-name">UAV Design: Foundations of Cyber-Physical Systems</h3>
                        
                        <p class="certificate-text" style="margin: 20px 0 15px 0; font-weight: 600;">Modules Completed with Excellence:</p>
                        
                        <div style="max-width: 600px; margin: 0 auto; text-align: left;">
                            ${modulesListHTML}
                        </div>
                        
                        <div class="score-badge" style="margin-top: 25px;">
                            <i class="fas fa-trophy"></i> Average Score: ${averageScore}% | ${completedModules.length} of 4 Modules
                        </div>
                        
                        <p class="achievement-text">
                            Demonstrating proficiency in UAV computing, networking, and autonomous systems
                        </p>
                    </div>
                    
                    <div class="certificate-footer">
                        <div class="signature-block">
                            <div class="signature-line"></div>
                            <p class="signature-name">Dr. Yan Wan</p>
                            <p class="signature-title">Course Director</p>
                            <p class="signature-title">Professor of Electrical Engineering</p>
                        </div>
                        
                        <div class="signature-block">
                            <div class="signature-line"></div>
                            <p class="signature-name">Dr. Kejie Lu</p>
                            <p class="signature-title">Course Instructor</p>
                            <p class="signature-title">Professor of Electrical Engineering</p>
                        </div>
                        
                        <div class="signature-block">
                            <p class="certificate-date">
                                <i class="fas fa-calendar"></i><br>
                                ${currentDate}
                            </p>
                        </div>
                    </div>
                    
                    <div class="certificate-id">
                        Certificate ID: UAV-${Date.now()}-CUMULATIVE
                    </div>
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
