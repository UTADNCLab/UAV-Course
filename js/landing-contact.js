// ===================================
// LANDING PAGE CONTACT FORM HANDLER
// Opens Gmail directly with pre-filled information
// ===================================

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
    
    // Handle form submission - Open Gmail with pre-filled data
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;
            
            // Create email body
            const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
            
            // Create mailto link
            const mailtoLink = `mailto:opencourse.uav@gmail.com?subject=UAV Course Contact Form&body=${emailBody}`;
            
            // Open user's email client
            window.location.href = mailtoLink;
            
            // Show notification
            showContactNotification('Opening your email client... Please send the email from there.', 'info');
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
                fileName.textContent = '';
            }, 1000);
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
