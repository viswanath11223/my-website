// ================= NAVIGATION EFFECTS =================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ================= SMOOTH SCROLL NAVIGATION =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const offsetTop = element.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================= BACK TO TOP BUTTON =================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================= FLOATING CONTACT WIDGET =================
const widgetToggle = document.getElementById('widgetToggle');
const widgetPanel = document.getElementById('widgetPanel');
const widgetClose = document.querySelector('.widget-close');

widgetToggle.addEventListener('click', () => {
    widgetPanel.classList.toggle('hidden');
});

widgetClose.addEventListener('click', (e) => {
    e.stopPropagation();
    widgetPanel.classList.add('hidden');
});

// Close widget when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.contact-widget')) {
        widgetPanel.classList.add('hidden');
    }
});

// ================= NOTIFICATION SYSTEM =================
function showNotification(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    // Set color based on type
    if (type === 'error') {
        toast.style.borderLeftColor = '#ef4444';
    } else if (type === 'warning') {
        toast.style.borderLeftColor = '#f59e0b';
    } else {
        toast.style.borderLeftColor = '#38bdf8';
    }

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ================= FORM HANDLING =================
function handleAdmissionForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Simple validation
    const name = form.querySelector('input[placeholder="John Doe"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const phone = form.querySelector('input[type="tel"]').value.trim();
    
    if (!name || !email || !phone) {
        showNotification('Please fill all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }

    // Simulate submission
    setTimeout(() => {
        showNotification('✓ Application submitted successfully! We will contact you soon.', 'success');
        form.reset();
    }, 500);
}

function handleWidgetForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[placeholder="Your name"]').value.trim();
    const email = form.querySelector('input[placeholder="Your email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    setTimeout(() => {
        showNotification('✓ Message sent! We will get back to you shortly.', 'success');
        form.reset();
        widgetPanel.classList.add('hidden');
    }, 500);
}

// ================= VALIDATION FUNCTIONS =================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ================= INTERSECTION OBSERVER FOR ANIMATIONS =================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.dataset.animation || 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section, .dept-card, .feature-card, .testimonial-card, .contact-card').forEach(el => {
    el.dataset.animation = 'fadeInUp 0.6s ease-out forwards';
    el.style.opacity = '0';
    observer.observe(el);
});

// Add fade-in-up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ================= SEARCH BAR FUNCTIONALITY =================
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
    const courses = [
        'Computer Science & Engineering',
        'Electronics & Communication',
        'Mechanical Engineering',
        'Artificial Intelligence',
        'Machine Learning',
        'Cloud Computing',
        'Cybersecurity',
        'VLSI Design',
        'IoT Solutions',
        'Robotics'
    ];

    // Handle search on button click
    searchBtn.addEventListener('click', performSearch);
    
    // Handle search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            const results = courses.filter(course => 
                course.toLowerCase().includes(query)
            );
            if (results.length > 0) {
                showNotification(`Found ${results.length} course(s) matching "${query}"`, 'success');
            } else {
                showNotification(`No courses found matching "${query}"`, 'warning');
            }
        }
    }
}

// ================= DEPARTMENT CARD INTERACTIONS =================
document.querySelectorAll('.dept-card').forEach(card => {
    card.addEventListener('click', function() {
        const deptName = this.querySelector('h3').textContent;
        showNotification(`Learn more about ${deptName}`, 'success');
    });
});

// ================= BUTTON CLICK HANDLING =================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const text = this.textContent.trim();
        
        if (text.includes('Explore Courses')) {
            showNotification('Redirecting to courses page...', 'success');
            setTimeout(() => {
                document.getElementById('departments').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        } else if (text.includes('Schedule Tour')) {
            showNotification('Tour scheduling coming soon!', 'warning');
        }
    });
});

// ================= PAGE LOAD ANIMATIONS =================
window.addEventListener('load', () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content h1');
    if (heroContent) {
        heroContent.style.animation = 'slideInLeft 0.8s ease-out';
    }

    // Counter animation for stats
    animateCounters();
});

// ================= COUNTER ANIMATION =================
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        
        if (!isNaN(num)) {
            let current = 0;
            const increment = Math.ceil(num / 50);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= num) {
                    counter.textContent = num + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = current + suffix;
                }
            }, 30);
        }
    });
}

// ================= RECRUITER LOGO HOVER =================
document.querySelectorAll('.logo-item').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ================= TESTIMONIAL STAR RATING =================
document.querySelectorAll('.stars').forEach(stars => {
    const rating = stars.querySelectorAll('i').length;
    stars.title = `${rating} out of 5 stars`;
});

// ================= ACCESSIBILITY - SKIP TO MAIN CONTENT =================
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #38bdf8;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
    border-radius: 0 0 4px 0;
`;

skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});

skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ================= DYNAMIC YEAR IN FOOTER =================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} QIS College of Engineering and Technology. All rights reserved.`;
}

// ================= MOBILE MENU HANDLING (if nav needs it) =================
// Add event listeners for mobile responsiveness
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Reset any mobile-specific styles
        document.querySelector('.nav-menu').style.display = '';
    }
});

console.log('✓ Website loaded successfully with premium glassmorphism design');
