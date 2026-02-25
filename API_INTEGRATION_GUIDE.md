# 🎯 API Integration Complete Guide

## ✅ What Has Been Done

### 1. API Configuration Files Created
- **js/api-config.js** - Base URL and endpoints configuration
- **js/api-auth.js** - Login, Register, Logout functions
- **js/api-courses.js** - Fetch, Create, Update, Delete courses
- **js/api-contact.js** - Contact form submission

### 2. Existing Files Updated
- **js/auth-modal.js** - Integrated with login/register API
- **js/script.js** - Integrated contact form and course loading
- **index.html** - Added API script references

---

## 🚀 How It Works

### Login/Register Flow
1. User opens website → Login modal appears
2. User enters credentials → API call to backend
3. Backend returns JWT token → Saved in localStorage
4. UI updates to show logged-in state

### Courses Loading
1. Page loads → Fetches courses from API
2. Displays courses dynamically
3. Filter by level works with API data

### Contact Form
1. User fills form → Validates data
2. Submits to backend API
3. Shows success/error notification

---

## 📝 Testing Steps

### Step 1: Start Backend
```cmd
cd "c:\Users\prave\OneDrive\Documents\Ishu Didi Works\backend"
mvn spring-boot:run
```

Wait for: `Started BootcampApiApplication`

### Step 2: Open Frontend
Open `index.html` in browser

### Step 3: Test Login
1. Login modal will appear
2. Click "Sign In" (if on register form)
3. Enter:
   - **Email:** admin@bootcamp.com
   - **Password:** Admin@123
4. Click Login
5. Should see "Login successful!" notification
6. Modal closes, page reloads

### Step 4: Test Courses
1. Scroll to "Featured Courses" section
2. Courses should load from API automatically
3. Click "View Details" or "Enroll Now"

### Step 5: Test Contact Form
1. Go to Contact page
2. Fill the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Message: Test message
3. Click Submit
4. Should see "Message sent successfully!" notification

---

## 🔧 API Functions Available

### Authentication
```javascript
// Login
const result = await loginUser('admin@bootcamp.com', 'Admin@123');

// Register
const result = await registerUser({
    username: 'john',
    email: 'john@example.com',
    password: 'Password@123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890'
});

// Logout
logoutUser();

// Check if logged in
if (isUserLoggedIn()) {
    console.log('User is logged in');
}

// Get current user
const user = getCurrentUser();
console.log(user.username, user.email, user.role);
```

### Courses
```javascript
// Fetch all courses
const result = await fetchAllCourses(page, size);
console.log(result.courses);

// Fetch course by ID
const result = await fetchCourseById(1);
console.log(result.course);

// Fetch by level
const result = await fetchCoursesByLevel('BEGINNER');

// Search courses
const result = await searchCourses('full stack');

// Create course (Admin only)
const result = await createCourse({
    title: 'New Course',
    description: 'Description',
    level: 'BEGINNER',
    duration: '3 months',
    price: 999.99,
    instructor: 'John Doe'
});

// Update course (Admin only)
const result = await updateCourse(1, courseData);

// Delete course (Admin only)
const result = await deleteCourse(1);
```

### Contact
```javascript
// Submit contact form
const result = await submitContactForm({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    courseInterest: 'Full Stack',
    message: 'I want to enroll'
});
```

---

## 🎨 UI Features

### Notifications
Automatic notifications appear for:
- ✅ Login success
- ❌ Login failed
- ✅ Registration success
- ✅ Contact form submitted
- ❌ Any errors

### User Menu
After login, click username button to see:
- Profile
- Admin Panel (if admin)
- Logout

### Auto-Loading
- Courses load automatically on page load
- No manual refresh needed

---

## 📂 File Structure

```
Ishu Didi Works/
├── index.html (✅ Updated)
├── js/
│   ├── api-config.js (✅ New)
│   ├── api-auth.js (✅ New)
│   ├── api-courses.js (✅ New)
│   ├── api-contact.js (✅ New)
│   ├── auth-modal.js (✅ Updated)
│   ├── script.js (✅ Updated)
│   └── dark-mode.js (existing)
├── pages/
│   ├── contact.html
│   ├── training.html
│   └── ... (other pages)
└── backend/ (Spring Boot API)
```

---

## 🔐 Security Features

### Token Storage
- JWT token stored in localStorage
- Automatically sent with protected API calls
- Removed on logout

### Protected Routes
- Admin functions require ADMIN role
- Token validation on backend
- Automatic error handling

---

## 🐛 Troubleshooting

### Issue: Login not working
**Check:**
1. Backend is running on port 8080
2. Open browser console (F12)
3. Check for CORS errors
4. Verify credentials: admin@bootcamp.com / Admin@123

### Issue: Courses not loading
**Check:**
1. Backend has courses in database
2. Open browser console
3. Check network tab for API calls
4. Verify API_BASE_URL in api-config.js

### Issue: Contact form not submitting
**Check:**
1. All required fields filled
2. Email format is valid
3. Phone is 10 digits
4. Backend is running

### Issue: CORS Error
**Solution:**
Backend already configured for CORS. If still error:
1. Check backend application.properties
2. Verify cors.allowed-origins includes your frontend URL

---

## 📱 Browser Console Commands

Test APIs directly in browser console (F12):

```javascript
// Test login
loginUser('admin@bootcamp.com', 'Admin@123').then(console.log);

// Test fetch courses
fetchAllCourses().then(console.log);

// Test contact form
submitContactForm({
    name: 'Test',
    email: 'test@test.com',
    phone: '1234567890',
    message: 'Test'
}).then(console.log);

// Check if logged in
console.log(isUserLoggedIn());

// Get current user
console.log(getCurrentUser());
```

---

## 🎯 Next Steps

### For Other Pages
To add API integration to other pages:

1. **Add scripts to HTML:**
```html
<script src="../js/api-config.js"></script>
<script src="../js/api-auth.js"></script>
<script src="../js/api-courses.js"></script>
<script src="../js/api-contact.js"></script>
```

2. **Use functions:**
```javascript
// In your page's script
document.addEventListener('DOMContentLoaded', function() {
    // Load courses
    fetchAllCourses().then(result => {
        if (result.success) {
            displayCourses(result.courses);
        }
    });
});
```

### For Training Page
Already integrated! Just add scripts:
```html
<script src="../js/api-config.js"></script>
<script src="../js/api-courses.js"></script>
```

### For Contact Page
Already integrated! Form will auto-submit to API.

---

## ✅ Verification Checklist

- [x] Backend running on http://localhost:8080
- [x] Frontend opens without errors
- [x] Login modal appears
- [x] Can login with admin credentials
- [x] Courses load on home page
- [x] Contact form submits successfully
- [x] Notifications appear
- [x] User menu works after login
- [x] Logout works

---

## 🎉 Success!

Your frontend is now fully integrated with the backend API!

**Test URLs:**
- Frontend: Open index.html in browser
- Backend API: http://localhost:8080/api/swagger-ui.html
- Health Check: http://localhost:8080/api/actuator/health

**Default Login:**
- Email: admin@bootcamp.com
- Password: Admin@123

---

**Everything is ready! Open index.html and test! 🚀**
