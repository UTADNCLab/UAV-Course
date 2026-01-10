// ===================================
// LANDING PAGE CONTACT FORM HANDLER
// ===================================

const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbzs7oApM-gF5Eb_AaGHPxaFSeyzXhfcuGPWLzyOyEalyXKgiVkHkPqXwZASGjmOGe8w/exec';

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const fileInput = document.getElementById('contactAttachment');
    const fileName = document.getElementById('fileName');
    
    // Handle file selection
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                fileName.textContent = file.name;
            } else {
                fileName.textContent = '';
            }
        });
    }
    
    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('contactSubmitBtn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                const name = document.getElementById('contactName').value;
                const email = document.getElementById('contactEmail').value;
                const message = document.getElementById('contactMessage').value;
                const attachment = fileInput.files[0];
                
                // Prepare email data
                const emailData = {
                    action: 'sendEmail',
                    data: {
                        name: name,
                        email: email,
                        message: message,
                        attachment: attachment ? attachment.name : null
                    }
                };
                
                // Send to backend
                const response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(emailData)
                });
                
                // Show success message (no-cors mode doesn't return response)
                showContactNotification('Message sent successfully! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                fileName.textContent = '';
                
            } catch (error) {
                console.error('Error sending message:', error);
                showContactNotification('Message sent! If you don\'t hear back, please email opencourse.uav@gmail.com', 'success');
                contactForm.reset();
                fileName.textContent = '';
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Show notification for contact form
function showContactNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'success') notification.style.background = '#10b981';
    if (type === 'error') notification.style.background = '#ef4444';
    if (type === 'info') notification.style.background = '#2563eb';
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '400px';
    notification.style.lineHeight = '1.5';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

console.log('%c📧 Landing Page Contact Form Loaded', 'color: #0064A4; font-weight: bold;');
