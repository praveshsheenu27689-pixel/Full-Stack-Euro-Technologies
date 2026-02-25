// Auth Modal JavaScript with API Integration
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const loginFormDiv = document.getElementById('loginForm');
    const registerFormDiv = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeBtn = document.querySelector('.close-btn');
    const socialBtns = document.querySelectorAll('.social-btn');

    // Check if user is already logged in
    if (isUserLoggedIn()) {
        updateUIForLoggedInUser();
    } else {
        // Show modal on page load only if not logged in
        authModal.style.display = 'flex';
    }

    // Switch to register form
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginFormDiv.classList.add('hidden');
            registerFormDiv.classList.remove('hidden');
        });
    }

    // Switch to login form
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerFormDiv.classList.add('hidden');
            loginFormDiv.classList.remove('hidden');
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            authModal.style.display = 'none';
        });
    }

    // Close on outside click
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                authModal.style.display = 'none';
            }
        });
    }

    // Handle Login Form Submission
    const loginFormElement = loginFormDiv?.querySelector('form');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Get form data
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            
            // Call API
            const result = await loginUser(email, password);
            
            if (result.success) {
                showNotification('Login successful! Welcome back.', 'success');
                authModal.style.display = 'none';
                updateUIForLoggedInUser();
                
                // Reload page after 1 second
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                showNotification(result.message, 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Handle Register Form Submission
    const registerFormElement = registerFormDiv?.querySelector('form');
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Get form data
            const fullName = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Split name
            const nameParts = fullName.trim().split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ') || firstName;
            
            const userData = {
                username: email.split('@')[0], // Use email prefix as username
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phone: ''
            };
            
            // Show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            
            // Call API
            const result = await registerUser(userData);
            
            if (result.success) {
                showNotification('Registration successful! Welcome aboard.', 'success');
                authModal.style.display = 'none';
                updateUIForLoggedInUser();
                
                // Reload page after 1 second
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                showNotification(result.message, 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Social authentication handlers
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`${provider} authentication coming soon!`, 'info');
        });
    });
});

// Update UI for logged in user
function updateUIForLoggedInUser() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Update CTA button to show user name
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.innerHTML = `<i class="fas fa-user"></i> ${user.username}`;
        ctaBtn.onclick = function() {
            showUserMenu();
        };
    }
}

// Show user menu
function showUserMenu() {
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    menu.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        padding: 10px;
        z-index: 1000;
    `;
    
    const user = getCurrentUser();
    
    menu.innerHTML = `
        <div style="padding: 10px; border-bottom: 1px solid #eee;">
            <strong>${user.username}</strong><br>
            <small>${user.email}</small>
        </div>
        <button onclick="window.location.href='pages/profile.html'" style="width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer;">
            <i class="fas fa-user"></i> Profile
        </button>
        ${user.role === 'ADMIN' ? '<button onclick="window.location.href=\'pages/admin.html\'" style="width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer;"><i class="fas fa-cog"></i> Admin Panel</button>' : ''}
        <button onclick="logoutUser()" style="width: 100%; padding: 10px; border: none; background: none; text-align: left; cursor: pointer; color: #ef4444;">
            <i class="fas fa-sign-out-alt"></i> Logout
        </button>
    `;
    
    document.body.appendChild(menu);
    
    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}