// Courses Service

// Fetch all courses
async function fetchAllCourses(page = 0, size = 10) {
    try {
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.COURSES}?page=${page}&size=${size}`), {
            method: 'GET',
            headers: getHeaders()
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, courses: data.data.content, totalPages: data.data.totalPages };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Fetch courses error:', error);
        return { success: false, message: 'Failed to fetch courses' };
    }
}

// Fetch course by ID
async function fetchCourseById(id) {
    try {
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.COURSE_BY_ID(id)), {
            method: 'GET',
            headers: getHeaders()
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, course: data.data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Fetch course error:', error);
        return { success: false, message: 'Failed to fetch course' };
    }
}

// Fetch courses by level
async function fetchCoursesByLevel(level, page = 0, size = 10) {
    try {
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.COURSES_BY_LEVEL(level)}?page=${page}&size=${size}`), {
            method: 'GET',
            headers: getHeaders()
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, courses: data.data.content };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Fetch courses by level error:', error);
        return { success: false, message: 'Failed to fetch courses' };
    }
}

// Search courses
async function searchCourses(keyword, page = 0, size = 10) {
    try {
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.SEARCH_COURSES(keyword)}&page=${page}&size=${size}`), {
            method: 'GET',
            headers: getHeaders()
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, courses: data.data.content };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Search courses error:', error);
        return { success: false, message: 'Failed to search courses' };
    }
}

// Create course (Admin only)
async function createCourse(courseData) {
    try {
        const token = getAuthToken();
        if (!token) {
            return { success: false, message: 'Please login first' };
        }
        
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.COURSES), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(courseData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, course: data.data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Create course error:', error);
        return { success: false, message: 'Failed to create course' };
    }
}

// Update course (Admin only)
async function updateCourse(id, courseData) {
    try {
        const token = getAuthToken();
        if (!token) {
            return { success: false, message: 'Please login first' };
        }
        
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.COURSE_BY_ID(id)), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(courseData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true, course: data.data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Update course error:', error);
        return { success: false, message: 'Failed to update course' };
    }
}

// Delete course (Admin only)
async function deleteCourse(id) {
    try {
        const token = getAuthToken();
        if (!token) {
            return { success: false, message: 'Please login first' };
        }
        
        const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.COURSE_BY_ID(id)), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            return { success: true };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Delete course error:', error);
        return { success: false, message: 'Failed to delete course' };
    }
}

// Display courses on page
function displayCourses(courses, containerId = 'coursesContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!courses || courses.length === 0) {
        container.innerHTML = '<p class="no-courses">No courses available</p>';
        return;
    }
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-image">
                <i class="fas fa-code"></i>
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration || 'N/A'}</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <p>${course.description || 'No description available'}</p>
                <div class="course-price">
                    <span class="price">₹${course.price}</span>
                    ${course.instructor ? `<span class="instructor">By ${course.instructor}</span>` : ''}
                </div>
                <div class="course-buttons">
                    <button class="btn btn-secondary" onclick="viewCourseDetails(${course.id})">View Details</button>
                    <button class="btn btn-primary" onclick="enrollCourse(${course.id})">Enroll Now</button>
                </div>
            </div>
        `;
        container.appendChild(courseCard);
    });
}

// View course details
function viewCourseDetails(courseId) {
    window.location.href = `pages/course-details.html?id=${courseId}`;
}

// Enroll in course
function enrollCourse(courseId) {
    if (!isUserLoggedIn()) {
        alert('Please login to enroll in a course');
        // Open login modal if exists
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'flex';
        }
        return;
    }
    
    // Redirect to enrollment page or show enrollment modal
    alert('Enrollment feature coming soon! Course ID: ' + courseId);
}
