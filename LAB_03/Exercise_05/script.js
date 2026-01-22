
let currentStage = 1;
let formData = {};

function validateStage1() {
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const nameError = document.getElementById('nameError');
    const ageError = document.getElementById('ageError');
    
    let valid = true;
    
    if (name.length < 3) {
        nameError.style.display = 'block';
        valid = false;
    } else {
        nameError.style.display = 'none';
        formData.name = name;
    }
    
    if (age < 18 || age > 100 || !age) {
        ageError.style.display = 'block';
        valid = false;
    } else {
        ageError.style.display = 'none';
        formData.age = age;
    }
    
    if (valid) {
        showStage(2);
        updateProgress(2);
    }
}

function validateStage2() {
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.replace(/\D/g, '');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    
    let valid = true;
    
    if (!email.includes('@') || !email.includes('.')) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
        formData.email = email;
    }
    
    if (phone.length !== 10) {
        phoneError.style.display = 'block';
        valid = false;
    } else {
        phoneError.style.display = 'none';
        formData.phone = phone;
    }
    
    if (valid) {
        showStage(3);
        updateProgress(3);
    }
}

function validateStage3() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');
    
    let valid = true;
    
    if (username.length < 4) {
        userError.style.display = 'block';
        valid = false;
    } else {
        userError.style.display = 'none';
        formData.username = username;
    }
    
    if (password.length < 6) {
        passError.style.display = 'block';
        valid = false;
    } else {
        passError.style.display = 'none';
        formData.password = password;
    }
    
    if (valid) {
        showReview();
        showStage(4);
        updateProgress(4);
    }
}

function showReview() {
    const review = document.getElementById('reviewData');
    review.innerHTML = `
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Age:</strong> ${formData.age}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Username:</strong> ${formData.username}</p>
        <p><strong>Password:</strong> ${'*'.repeat(formData.password.length)}</p>
    `;
}

function showStage(stageNum) {
    document.getElementById('stage1').style.display = 'none';
    document.getElementById('stage2').style.display = 'none';
    document.getElementById('stage3').style.display = 'none';
    document.getElementById('stage4').style.display = 'none';
    document.getElementById(`stage${stageNum}`).style.display = 'block';
    currentStage = stageNum;
}

function updateProgress(stageNum) {
    const width = stageNum * 25;
    document.getElementById('progressBar').style.width = width + '%';
    
    document.querySelectorAll('[style*="background:#007bff"]').forEach(el => {
        if (el.style.background === 'rgb(0, 123, 255)') {
            el.style.background = '#ddd';
        }
    });
    
    for (let i = 1; i <= stageNum; i++) {
        const circles = document.querySelectorAll(`div:nth-child(${i}) > div:nth-child(1)`);
        circles.forEach(circle => {
            if (circle.parentElement.parentElement.children.length === 4) {
                circle.style.background = '#007bff';
            }
        });
    }
}

function prevStage() {
    if (currentStage > 1) {
        showStage(currentStage - 1);
        updateProgress(currentStage - 1);
    }
}

function submitForm() {
    document.getElementById('stage4').style.display = 'none';
    document.getElementById('success').style.display = 'block';
    
    const final = document.getElementById('finalData');
    final.innerHTML = '';
    for (const key in formData) {
        if (key !== 'password') {
            final.innerHTML += `<p><strong>${key}:</strong> ${formData[key]}</p>`;
        }
    }
    
    console.log('Form submitted:', formData);
}
