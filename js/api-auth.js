// Authentication Service

// Login function
async function loginUser(usernameOrEmail, password) {
    try {
        // Try with username first
        let response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ 
                username: usernameOrEmail.includes('@') ? usernameOrEmail.split('@')[0] : usernameOrEmail, 
                password: password 
            })
        });
        
        const data = await response.json();
        
        if (data.success && data.data) {
            // Save token and user info
            localStorage.setItem('authToken', data.data.token);
            localStorage.setItem('userId', data.data.id);
            localStorage.setItem('username', data.data.username);
            localStorage.setItem('userEmail', data.data.email);
            localStorage.setItem('userRole', data.data.role);
            
            return { success: true, data: data.data };
        } else {
            return { success: false, message: data.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error. Please check if backend is running on http://localhost:8080' };
    }
}

// Register function
async function registerUser(userData) {
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.REGISTER), {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success && data.data) {
            // Auto login after registration
            localStorage.setItem('authToken', data.data.token);
            localStorage.setItem('userId', data.data.id);
            localStorage.setItem('username', data.data.username);
            localStorage.setItem('userEmail', data.data.email);
            localStorage.setItem('userRole', data.data.role);
            
            return { success: true, data: data.data };
        } else {
            return { success: false, message: data.message || 'Registration failed' };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'Network error. Please try again.' };
    }
}

// Logout function
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    
    // Redirect to home
    window.location.href = '/index.html';
}

// Check if user is logged in
function isUserLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

// Get current user info
function getCurrentUser() {
    if (!isUserLoggedIn()) return null;
    
    return {
        id: localStorage.getItem('userId'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('userEmail'),
        role: localStorage.getItem('userRole')
    };
}

// Check if user is admin
function isAdmin() {
    return localStorage.getItem('userRole') === 'ADMIN';
}
