// Auth Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeBtn = document.querySelector('.close-btn');
    const socialBtns = document.querySelectorAll('.social-btn');

    // Show modal on page load
    authModal.style.display = 'flex';

    // Switch to register form
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    // Switch to login form
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        authModal.style.display = 'none';
    });

    // Close on outside click
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // Social authentication handlers
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            
            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            
            // Simulate authentication process
            setTimeout(() => {
                alert(`${provider} authentication would be implemented here`);
                this.innerHTML = originalContent;
                authModal.style.display = 'none';
            }, 1500);
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('.auth-form form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission would be handled here');
            authModal.style.display = 'none';
        });
    });
});