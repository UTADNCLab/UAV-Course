// ===================================
// CONTACT/QUESTION FORM SYSTEM
// ===================================

// Professor contact information with actual emails
const PROFESSOR_CONTACTS = {
    'dr-yan-wan': {
        name: 'Dr. Yan Wan',
        title: 'Professor of Electrical Engineering',
        email: 'yan.wan@uta.edu',
        expertise: 'Cyber-physical systems, networked control systems, multi-agent coordination'
    },
    'dr-junfei-xie': {
        name: 'Dr. Junfei Xie',
        title: 'Professor of Computer Science',
        email: 'jxie4@sdsu.edu',
        expertise: 'Machine learning, computer vision, AI applications'
    },
    'dr-kejie-lu': {
        name: 'Dr. Kejie Lu',
        title: 'Professor of Electrical Engineering',
        email: 'kejie.lu@upr.edu',
        expertise: 'Wireless communications, network optimization, 5G/6G technologies'
    },
    'dr-shengli-fu': {
        name: 'Dr. Shengli Fu',
        title: 'Professor of Computer Engineering',
        email: 'Shengli.Fu@unt.edu',
        expertise: 'Embedded systems, IoT architectures, distributed computing'
    }
};

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbzs7oApM-gF5Eb_AaGHPxaFSeyzXhfcuGPWLzyOyEalyXKgiVkHkPqXwZASGjmOGe8w/exec';

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
// CLOSE CONTACT FORM
// ===================================
function closeContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('show');
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
    
    const professorKey = document.getElementById('professorSelect').value;
    const subject = document.getElementById('questionSubject').value.trim();
    const message = document.getElementById('questionMessage').value.trim();
    
    if (!professorKey) {
        showNotification('Please select a professor', 'error');
        return;
    }
    
    if (!subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const professor = PROFESSOR_CONTACTS[professorKey];
        
        // Create email body with user info
        const emailBody = `From: ${user.name} (${user.email})%0D%0A%0D%0AQuestion:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A---%0D%0ASent via UAV Course Platform`;
        
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
            message: message,
            from: user.email,
            timestamp: new Date().toISOString(),
            status: 'opened_in_client'
        });
        localStorage.setItem('uav_course_sent_questions', JSON.stringify(sentQuestions));
        
        // Reset form after delay
        setTimeout(() => {
            event.target.reset();
            document.getElementById('professorInfo').style.display = 'none';
            closeContactForm();
        }, 1000);
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Failed to open email client. Please try again.', 'error');
    }
}

// ===================================
// GENERATE PROFESSOR EMAILS (FOR SETUP)
// ===================================
function generateProfessorEmails() {
    console.log('%c👨‍🏫 PROFESSOR CONTACT EMAILS', 'color: #F47E3C; font-size: 16px; font-weight: bold;');
    console.log('\nCopy these placeholder emails and replace with actual professor emails:\n');
    
    Object.entries(PROFESSOR_CONTACTS).forEach(([key, prof]) => {
        console.log(`${prof.name}:`);
        console.log(`  Current: ${prof.email}`);
        console.log(`  Replace with actual email in js/contact.js\n`);
    });
    
    console.log('\nTo update emails, edit the PROFESSOR_CONTACTS object in js/contact.js');
}

// Auto-generate email list on load for easy setup
console.log('%c📬 Contact System Loaded', 'color: #0064A4; font-weight: bold;');
console.log('Run generateProfessorEmails() to see placeholder emails');
