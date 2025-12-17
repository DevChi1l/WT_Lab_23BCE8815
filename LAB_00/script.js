// Navigation functions
function goToRegister() {
    window.location.href = 'register.html';
}

function goToLanding() {
    window.location.href = 'index.html';
}

// Clear form function
function clearForm() {
    document.getElementById('registrationForm').reset();
}

// Validation functions
function validateName(name) {
    return name.trim().length > 0;
}

function validateMobile(mobile) {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateRegNumber(regNumber) {
    // Format: 2 digits, 3 letters, 4 digits (e.g., 12ABC1234)
    const regPattern = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;
    return regPattern.test(regNumber);
}

// Form submission handler
if (document.getElementById('registrationForm')) {
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const regNumber = document.getElementById('regNumber').value;
        
        // Validate name
        if (!validateName(name)) {
            alert('Please enter a valid name');
            return;
        }
        
        // Validate mobile
        if (!validateMobile(mobile)) {
            alert('Mobile number must be exactly 10 digits');
            return;
        }
        
        // Validate email
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Validate registration number
        if (!validateRegNumber(regNumber)) {
            alert('Registration number format is incorrect!\nFormat should be: 2 digits, 3 letters, 4 digits\nExample: 12ABC1234');
            return;
        }
        
        // If all validations pass
        alert('Registration successful! Welcome to EduLearn.\n\nName: ' + name + '\nMobile: ' + mobile + '\nEmail: ' + email + '\nReg Number: ' + regNumber);
        
        // Clear form
        clearForm();
    });
}