// ===================================
// CONTACT/QUESTION FORM SYSTEM
// ===================================

// Professor contact information (placeholder emails - replace with actual)
const PROFESSOR_CONTACTS = {
    'dr-yan-wan': {
        name: 'Dr. Yan Wan',
        title: 'Professor of Electrical Engineering',
        email: 'yan.wan@university.edu',
        expertise: 'Cyber-physical systems, networked control systems, multi-agent coordination'
    },
    'dr-junfei-xie': {
        name: 'Dr. Junfei Xie',
        title: 'Professor of Computer Science',
        email: 'junfei.xie@university.edu',
        expertise: 'Machine learning, computer vision, AI applications'
    },
    'dr-kejie-lu': {
        name: 'Dr. Kejie Lu',
        title: 'Professor of Electrical Engineering',
        email: 'kejie.lu@university.edu',
        expertise: 'Wireless communications, network optimization, 5G/6G technologies'
    },
    'dr-shengli-fu': {
        name: 'Dr. Shengli Fu',
        title: 'Professor of Computer Engineering',
        email: 'shengli.fu@university.edu',
        expertise: 'Embedded systems, IoT architectures, distributed computing'
    }
};

// ===================================
// SHOW CONTACT FORM
// ===================================
function showContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('show');
        
        // Populate professor dropdown
        const professorSelect = document.getElementById('professorSelect');
        if (professorSelect && professorSelect.options.length === 1) {
            Object.entries(PROFESSOR_CONTACTS).forEach(([key, prof]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = `${prof.name} - ${prof.title}`;
                professorSelect.appendChild(option);
            });
        }
        
        // Update professor info when selection changes
        professorSelect.addEventListener('change', updateProfessorInfo);
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
// UPDATE PROFESSOR INFO
// ===================================
function updateProfessorInfo() {
    const professorSelect = document.getElementById('professorSelect');
    const professorInfo = document.getElementById('professorInfo');
    
    if (!professorSelect || !professorInfo) return;
    
    const selectedKey = professorSelect.value;
    
    if (selectedKey && PROFESSOR_CONTACTS[selectedKey]) {
        const prof = PROFESSOR_CONTACTS[selectedKey];
        professorInfo.style.display = 'block';
        professorInfo.innerHTML = `
            <div style="padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0064A4;">
                <h4 style="margin: 0 0 8px 0; color: #0064A4;">${prof.name}</h4>
                <p style="margin: 0 0 5px 0; font-size: 14px; color: #666;">${prof.title}</p>
                <p style="margin: 0; font-size: 13px; color: #888;"><strong>Expertise:</strong> ${prof.expertise}</p>
            </div>
        `;
    } else {
        professorInfo.style.display = 'none';
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
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        const professor = PROFESSOR_CONTACTS[professorKey];
        
        // Create email data
        const emailData = {
            to: professor.email,
            from: user.email,
            fromName: user.name,
            subject: `[UAV Course Question] ${subject}`,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        // In a real application, this would send to your backend
        // For now, we'll show the email details to copy
        console.log('%c📧 EMAIL TO SEND', 'color: #0064A4; font-size: 16px; font-weight: bold;');
        console.log('To:', professor.email);
        console.log('From:', `${user.name} <${user.email}>`);
        console.log('Subject:', emailData.subject);
        console.log('Message:', message);
        console.log('\n--- Copy this information to send manually ---');
        
        // Show success message with email details
        const emailContent = `
TO: ${professor.name} (${professor.email})
FROM: ${user.name} (${user.email})
SUBJECT: ${emailData.subject}

MESSAGE:
${message}

---
Sent via UAV Course Platform
${new Date().toLocaleString()}
        `.trim();
        
        // Store in localStorage for reference
        const sentQuestions = JSON.parse(localStorage.getItem('uav_course_sent_questions') || '[]');
        sentQuestions.push({
            ...emailData,
            professorName: professor.name,
            status: 'pending'
        });
        localStorage.setItem('uav_course_sent_questions', JSON.stringify(sentQuestions));
        
        // Show success with copy option
        showNotification('Question prepared! Check console for email details.', 'success');
        
        // Show modal with email content
        alert(`Your question has been prepared!\n\nEmail Details (also in console):\n\n${emailContent}\n\nNote: In production, this would be sent automatically via email service.`);
        
        // Reset form
        event.target.reset();
        document.getElementById('professorInfo').style.display = 'none';
        
        // Close modal
        closeContactForm();
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Failed to send question. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
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
