// ========== FORM TOGGLE ==========
function toggleForm(event) {
    event.preventDefault();
    
    const signinBox = document.getElementById('signinBox');
    const signupBox = document.getElementById('signupBox');
    
    signinBox.classList.toggle('hidden');
    signupBox.classList.toggle('hidden');
}

// ========== SIGN IN HANDLER ==========
function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    if (!email || !password) {
        showNotification('Please fill all fields', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return false;
    }
    
    showNotification('Sign in successful! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
    
    return false;
}

// ========== SIGN UP HANDLER ==========
function handleSignUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill all fields', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return false;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return false;
    }
    
    showNotification('Account created successfully! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
    
    return false;
}

// ========== GOOGLE LOGIN ==========
function handleGoogleLogin() {
    showNotification('Redirecting to Google Sign In...', 'success');
    
    setTimeout(() => {
        showNotification('Google Sign In successful!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

// ========== GOOGLE SIGN UP ==========
function handleGoogleSignUp() {
    showNotification('Redirecting to Google Sign Up...', 'success');
    
    setTimeout(() => {
        showNotification('Google Sign Up successful!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

// ========== TWITTER LOGIN ==========
function handleTwitterLogin() {
    showNotification('Redirecting to Twitter Sign In...', 'success');
    
    setTimeout(() => {
        showNotification('Twitter Sign In successful!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

// ========== TWITTER SIGN UP ==========
function handleTwitterSignUp() {
    showNotification('Redirecting to Twitter Sign Up...', 'success');
    
    setTimeout(() => {
        showNotification('Twitter Sign Up successful!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

// ========== SHOW NOTIFICATION ==========
function showNotification(message, type = 'info') {
    const toast = document.getElementById('loginToast');
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

// ========== EMAIL VALIDATION ==========
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== PHONE VALIDATION ==========
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// ========== PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.login-form');
    
    forms.forEach(form => {
        form.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.click();
            }
        });
    });
    
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});
