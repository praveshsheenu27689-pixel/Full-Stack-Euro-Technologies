// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:8080/api/v1',
    ENDPOINTS: {
        // Auth
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        
        // Courses
        COURSES: '/courses',
        COURSE_BY_ID: (id) => `/courses/${id}`,
        COURSES_BY_LEVEL: (level) => `/courses/level/${level}`,
        SEARCH_COURSES: (keyword) => `/courses/search?keyword=${keyword}`,
        
        // Contact
        CONTACT: '/contact',
        
        // Health
        HEALTH: '/actuator/health'
    }
};

// Helper function to get full URL
function getApiUrl(endpoint) {
    return API_CONFIG.BASE_URL + endpoint;
}

// Helper function to get token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Helper function to get headers
function getHeaders(includeAuth = false) {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (includeAuth) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    
    return headers;
}

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(getApiUrl(endpoint), {
            ...options,
            headers: getHeaders(options.requireAuth)
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
