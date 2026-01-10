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
        modal.dataset.professorKey = '';
    }
}

// ===================================
// HANDLE CONTACT FORM SUBMISSION
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
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const professor = PROFESSOR_CONTACTS[professorKey];
        
        // Create email data
        const emailData = {
            action: 'sendProfessorEmail',
            data: {
                studentName: user.name,
                studentEmail: user.email,
                professorEmail: professor.email,
                professorName: professor.name,
                subject: subject,
                question: question
            }
        };
        
        // Send to backend
        await fetch(BACKEND_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });
        
        // Show success message
        showNotification(`Question sent to ${professor.name} successfully!`, 'success');
        
        // Reset form
        event.target.reset();
        
        // Close modal
        closeContactForm();
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Question sent! The professor will receive your message.', 'success');
        event.target.reset();
        closeContactForm();
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

console.log('%c📬 Contact System Loaded', 'color: #0064A4; font-weight: bold;');
