// ===================================
// CONTACT/QUESTION FORM SYSTEM
// ===================================

// Professor contact information with actual emails
const PROFESSOR_CONTACTS = {
    'dr-yan-wan': {
        name: 'Dr. Yan Wan',
        title: 'Distinguished University Professor, Electrical Engineering',
        email: 'yan.wan@uta.edu',
        expertise: 'Cyber-physical systems, networked control systems, and multi-agent coordination. Research focuses on intelligent UAV systems for disaster response and infrastructure monitoring.'
    },
    'dr-junfei-xie': {
        name: 'Dr. Junfei Xie',
        title: 'Professor, Department of Electrical and Computer Engineering',
        email: 'jxie4@sdsu.edu',
        expertise: 'Unmanned aerial systems, artificial intelligence, and large-scale dynamical networks. Research focuses on cyber-physical systems, networked airborne computing, and stochastic modeling and control for autonomous and intelligent UAV systems. Work also addresses airborne networks, air traffic flow management, and complex information systems for scalable autonomous operations.'
    },
    'dr-kejie-lu': {
        name: 'Dr. Kejie Lu',
        title: 'IEEE Senior Member, Professor, Department of Computer Science and Engineering',
        email: 'kejie.lu@upr.edu',
        expertise: 'Computer and communication networks, including network architecture, protocol design, performance evaluation, and security. Research also covers wireless communications, space-time coding, and channel capacity analysis, contributing to robust and high-performance communication frameworks for UAV and distributed networked systems.'
    },
    'dr-shengli-fu': {
        name: 'Dr. Shengli Fu',
        title: 'Professor, Department of Electrical Engineering',
        email: 'Shengli.Fu@unt.edu',
        expertise: 'Modulation, coding, and information theory, with strong emphasis on wireless communications and sensor networks. Work spans cooperative communications, distributed networks, and pattern recognition, including audio and visual signal processing, supporting reliable and efficient communication systems for modern networked and airborne platforms.'
    }
};

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbxz-4ZhhhuSxBWs8cZ5NMnBlHf-Q_PdYwhxWjQOizXSP69U9l4EqkJYWWu7YMQctXUkTw/exec';

// ===================================
// SHOW CONTACT FORM (with specific professor)
// ===================================
function showContactForm(professorKey = null) {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('show');
        
        // If professor key is provided, set it
        if (professorKey && PROFESSOR_CONTACTS[professorKey]) {
            // Store the professor key for form submission
            modal.dataset.professorKey = professorKey;
            
            // Show professor info
            const professor = PROFESSOR_CONTACTS[professorKey];
            const professorInfo = document.getElementById('professorInfo');
            if (professorInfo) {
                professorInfo.style.display = 'block';
                professorInfo.innerHTML = `
                    <div style="padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0064A4;">
                        <h4 style="margin: 0 0 8px 0; color: #0064A4;">${professor.name}</h4>
                        <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">${professor.title}</p>
                        <p style="margin: 0; font-size: 13px; color: #888;"><strong>Expertise:</strong> ${professor.expertise}</p>
                    </div>
                `;
            }
        }
    }
}

// ===================================
// SHOW CONTACT FORM WITH PROFESSOR PRE-SELECTED
// ===================================
function showContactFormWithProfessor(professorKey) {
    showContactForm(professorKey);
}

// ===================================
// CLOSE CONTACT FORM
// ===================================
function closeContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('show');
        modal.dataset.professorKey = '';
    }
}

// ===================================
// HANDLE CONTACT FORM SUBMISSION
// Opens Gmail with pre-filled professor email
// ===================================
async function handleContactSubmit(event) {
    event.preventDefault();
    
    const user = window.authFunctions ? window.authFunctions.currentUser() : null;
    if (!user) {
        showNotification('Please login to send questions', 'error');
        return;
    }
    
    const modal = document.getElementById('contactModal');
    const professorKey = modal.dataset.professorKey;
    
    if (!professorKey || !PROFESSOR_CONTACTS[professorKey]) {
        showNotification('Professor information not found', 'error');
        return;
    }
    
    const subject = document.getElementById('questionSubject').value.trim();
    const question = document.getElementById('questionMessage').value.trim();
    
    if (!subject || !question) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const professor = PROFESSOR_CONTACTS[professorKey];
        
        // Create email body with user info
        const emailBody = `From: ${user.name} (${user.email})%0D%0A%0D%0AQuestion:%0D%0A${encodeURIComponent(question)}%0D%0A%0D%0A---%0D%0ASent via UAV Course Platform`;
        
        // Create mailto link to professor
        const mailtoLink = `mailto:${professor.email}?subject=${encodeURIComponent(`[UAV Course] ${subject}`)}&body=${emailBody}`;
        
        // Open user's email client
        window.location.href = mailtoLink;
        
        // Show notification
        showNotification(`Opening email to ${professor.name}... Please send from your email client.`, 'success');
        
        // Store in localStorage for reference
        const sentQuestions = JSON.parse(localStorage.getItem('uav_course_sent_questions') || '[]');
        sentQuestions.push({
            professorName: professor.name,
            professorEmail: professor.email,
            subject: subject,
            message: question,
            from: user.email,
            timestamp: new Date().toISOString(),
            status: 'opened_in_client'
        });
        localStorage.setItem('uav_course_sent_questions', JSON.stringify(sentQuestions));
        
        // Reset form after delay
        setTimeout(() => {
            event.target.reset();
            closeContactForm();
        }, 1000);
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Failed to open email client. Please try again.', 'error');
    }
}

console.log('%c📬 Contact System Loaded', 'color: #0064A4; font-weight: bold;');
