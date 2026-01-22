const questions = [
    {
        id: 1,
        text: "What is your name?",
        type: "text",
        required: true,
        maxLength: 50
    },
    {
        id: 2,
        text: "What is your email address?",
        type: "email",
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    {
        id: 3,
        text: "Which programming languages do you know?",
        type: "checkbox",
        required: true,
        minSelect: 1,
        maxSelect: 3,
        options: ["JavaScript", "Python", "Java", "C++", "Ruby", "PHP"]
    },
    {
        id: 4,
        text: "How would you rate this survey?",
        type: "radio",
        required: true,
        options: ["Poor", "Fair", "Good", "Excellent"]
    },
    {
        id: 5,
        text: "Any additional comments?",
        type: "textarea",
        required: false,
        maxLength: 200
    }
];

let responses = {};
let surveyValid = false;

function init() {
    renderSurvey();
    document.getElementById('submitBtn').disabled = true;
}

function renderSurvey() {
    const container = document.getElementById('surveyQuestions');
    container.innerHTML = '';
    
    questions.forEach(question => {
        const div = document.createElement('div');
        div.className = 'question';
        div.id = `question_${question.id}`;
        
        let questionHTML = `<h3>${question.text}${question.required ? ' *' : ''}</h3>`;
        
        if (question.type === 'text' || question.type === 'email') {
            questionHTML += `
                <input type="${question.type}" 
                        id="input_${question.id}" 
                        oninput="validateQuestion(${question.id})">
            `;
        } else if (question.type === 'textarea') {
            questionHTML += `
                <textarea id="input_${question.id}" 
                            rows="4" 
                            oninput="validateQuestion(${question.id})"></textarea>
                <div>Characters left: <span id="counter_${question.id}">${question.maxLength}</span></div>
            `;
        } else if (question.type === 'checkbox') {
            questionHTML += '<div class="options">';
            question.options.forEach((option, index) => {
                questionHTML += `
                    <div class="option">
                        <input type="checkbox" 
                                id="check_${question.id}_${index}" 
                                value="${option}"
                                onchange="validateQuestion(${question.id})">
                        <label>${option}</label>
                    </div>
                `;
            });
            questionHTML += '</div>';
        } else if (question.type === 'radio') {
            questionHTML += '<div class="options">';
            question.options.forEach((option, index) => {
                questionHTML += `
                    <div class="option">
                        <input type="radio" 
                                name="radio_${question.id}" 
                                id="radio_${question.id}_${index}" 
                                value="${option}"
                                onchange="validateQuestion(${question.id})">
                        <label>${option}</label>
                    </div>
                `;
            });
            questionHTML += '</div>';
        }
        
        questionHTML += `<div class="error" id="error_${question.id}"></div>`;
        div.innerHTML = questionHTML;
        container.appendChild(div);
    });
}

function validateQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    const errorDiv = document.getElementById(`error_${questionId}`);
    const inputElement = document.getElementById(`input_${questionId}`);
    
    let isValid = true;
    let errorMessage = '';
    
    if (question.type === 'text' || question.type === 'email') {
        const value = inputElement.value.trim();
        
        if (question.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (question.type === 'email' && question.pattern && !question.pattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (question.maxLength && value.length > question.maxLength) {
            isValid = false;
            errorMessage = `Maximum ${question.maxLength} characters allowed`;
        }
        
        if (isValid) {
            responses[questionId] = value;
            inputElement.classList.remove('invalid');
            inputElement.classList.add('valid');
        } else {
            responses[questionId] = '';
            inputElement.classList.remove('valid');
            inputElement.classList.add('invalid');
        }
        
    } else if (question.type === 'textarea') {
        const value = inputElement.value.trim();
        const counter = document.getElementById(`counter_${questionId}`);
        
        if (counter) {
            const remaining = question.maxLength - value.length;
            counter.textContent = remaining;
            counter.style.color = remaining < 20 ? 'red' : 'black';
        }
        
        if (question.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (question.maxLength && value.length > question.maxLength) {
            isValid = false;
            errorMessage = `Maximum ${question.maxLength} characters exceeded`;
        }
        
        if (isValid) {
            responses[questionId] = value;
            inputElement.classList.remove('invalid');
            inputElement.classList.add('valid');
        } else {
            responses[questionId] = '';
            inputElement.classList.remove('valid');
            inputElement.classList.add('invalid');
        }
        
    } else if (question.type === 'checkbox') {
        const checkedBoxes = [];
        question.options.forEach((option, index) => {
            const checkbox = document.getElementById(`check_${questionId}_${index}`);
            if (checkbox.checked) checkedBoxes.push(checkbox.value);
        });
        
        responses[questionId] = checkedBoxes;
        
        if (question.required && checkedBoxes.length === 0) {
            isValid = false;
            errorMessage = 'Please select at least one option';
        } else if (question.minSelect && checkedBoxes.length < question.minSelect) {
            isValid = false;
            errorMessage = `Please select at least ${question.minSelect} option(s)`;
        } else if (question.maxSelect && checkedBoxes.length > question.maxSelect) {
            isValid = false;
            errorMessage = `Please select at most ${question.maxSelect} option(s)`;
        }
        
    } else if (question.type === 'radio') {
        let selectedValue = '';
        question.options.forEach((option, index) => {
            const radio = document.getElementById(`radio_${questionId}_${index}`);
            if (radio.checked) selectedValue = radio.value;
        });
        
        responses[questionId] = selectedValue;
        
        if (question.required && !selectedValue) {
            isValid = false;
            errorMessage = 'Please select an option';
        }
    }
    
    if (isValid) {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    } else {
        errorDiv.style.display = 'block';
        errorDiv.textContent = errorMessage;
    }
    
    validateAllQuestions();
    return isValid;
}

function validateAllQuestions() {
    let allValid = true;
    
    questions.forEach(question => {
        if (question.required) {
            if (!responses[question.id]) {
                allValid = false;
            } else if (Array.isArray(responses[question.id]) && responses[question.id].length === 0) {
                allValid = false;
            }
        }
    });
    
    surveyValid = allValid;
    document.getElementById('submitBtn').disabled = !allValid;
    return allValid;
}

function validateAndSubmit() {
    if (!validateAllQuestions()) {
        alert('Please complete all required questions');
        return;
    }
    
    document.getElementById('surveyContainer').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    
    const resultsDiv = document.getElementById('surveyResults');
    resultsDiv.innerHTML = '<h4>Your Responses:</h4>';
    
    questions.forEach(question => {
        const response = responses[question.id];
        const responseText = Array.isArray(response) ? response.join(', ') : (response || 'Not answered');
        resultsDiv.innerHTML += `<p><strong>${question.text}</strong><br>${responseText}</p>`;
    });
    
    console.log('Survey submitted:', responses);
}
