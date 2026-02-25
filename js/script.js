// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link (except dropdown parent)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.parentElement;
            if (!parent.classList.contains('dropdown')) {
                navMenu.classList.remove('active');
            } else {
                // If it's the Services link itself, allow navigation on second click
                const dropdown = parent;
                if (dropdown.classList.contains('active')) {
                    // Second click - navigate to services page
                    navMenu.classList.remove('active');
                    dropdown.classList.remove('active');
                }
            }
        });
    });
    
    // Handle dropdown in mobile
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        const dropdownLink = dropdown.querySelector('a');
        dropdownLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!dropdown.classList.contains('active')) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            }
        });
        
        // Close menu when dropdown item is clicked
        dropdown.querySelectorAll('.dropdown-menu a').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                dropdown.classList.remove('active');
            });
        });
    }
}

// 3D Mouse Follow Effect for Hero Section - DISABLED
// Hero section hover effects are now disabled

// Counter Animation
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : '+');
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + (counter.getAttribute('data-target').includes('%') ? '%' : '+');
        }
    };

    updateCounter();
};

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Filter Functionality for Training Page
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        courseCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const level = card.getAttribute('data-level');
                if (level === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Filter Functionality for Portfolio Page
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Validation with API Integration
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Smooth scroll for footer course links
if (window.location.pathname.includes('training.html') && window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, 100);
}

// Sticky Header on Scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Scroll Animations
const observeElements = () => {
    const elements = document.querySelectorAll('.card, .course-card, .service-card, .project-card, .testimonial-card, .review-card, .video-card, .stat-box, .mv-card, .team-card, .cta-section, .story-card, .process-step, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
});

// Smooth scroll reveal for all sections
const revealOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(section);
    });
};

// Initialize reveal on scroll
window.addEventListener('load', () => {
    revealOnScroll();
});

// CTA Button Actions
const ctaBtns = document.querySelectorAll('.cta-btn, .btn-primary');

ctaBtns.forEach(btn => {
    if (btn.textContent.includes('Enroll') || btn.textContent.includes('Book')) {
        btn.addEventListener('click', (e) => {
            if (!btn.closest('form')) {
                e.preventDefault();
                // Redirect to contact page or show modal
                if (window.location.pathname.includes('pages')) {
                    window.location.href = 'contact.html';
                } else {
                    window.location.href = 'pages/contact.html';
                }
            }
        });
    }
});

// Download Brochure Button
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Download Brochure')) {
        btn.addEventListener('click', () => {
            alert('Brochure download will start shortly!');
            // In real implementation, trigger actual download
        });
    }
});

// View Details Button for Courses
document.querySelectorAll('.course-card .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        const courseCard = btn.closest('.course-card');
        const courseName = courseCard.querySelector('h3').textContent;
        alert(`Course Details for: ${courseName}\n\nThis would open a detailed course page with full curriculum, instructor info, and enrollment options.`);
    });
});

// Video Play Button
document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        alert('Video player would open here with the testimonial video.');
    });
});

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

if (slides.length > 0) {
    showSlide(0);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Project View Live and GitHub Links
document.querySelectorAll('.project-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const action = link.textContent.includes('GitHub') ? 'GitHub repository' : 'live project';
        alert(`This would open the ${action} in a new tab.`);
    });
});

console.log('DevBootcamp Website Loaded Successfully! 🚀');

// Load courses from API on home page
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    // Load featured courses
    fetchAllCourses(0, 3).then(result => {
        if (result.success && result.courses) {
            const courseGrid = document.querySelector('.featured-courses .course-grid');
            if (courseGrid && result.courses.length > 0) {
                courseGrid.innerHTML = '';
                result.courses.forEach(course => {
                    const courseCard = document.createElement('div');
                    courseCard.className = 'course-card';
                    courseCard.innerHTML = `
                        <div class="course-image">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="course-content">
                            <h3>${course.title}</h3>
                            <div class="course-meta">
                                <span><i class="fas fa-clock"></i> ${course.duration || '6 Months'}</span>
                                <span><i class="fas fa-signal"></i> ${course.level}</span>
                            </div>
                            <p>${course.description || 'Complete course description'}</p>
                            <div class="course-buttons">
                                <button class="btn btn-secondary" onclick="viewCourseDetails(${course.id})">View Details</button>
                                <button class="btn btn-primary" onclick="enrollCourse(${course.id})">Enroll Now</button>
                            </div>
                        </div>
                    `;
                    courseGrid.appendChild(courseCard);
                });
            }
        }
    });
}

// Load all courses on training page
if (window.location.pathname.includes('training.html')) {
    fetchAllCourses(0, 20).then(result => {
        if (result.success && result.courses) {
            displayCourses(result.courses, 'coursesContainer');
        }
    });
}
