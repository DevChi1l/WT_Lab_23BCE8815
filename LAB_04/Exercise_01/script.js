document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const messageDiv = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    const form = document.getElementById('registerForm');

    let typingTimer;
    const doneTypingInterval = 500;

    usernameInput.addEventListener('input', function() {
        clearTimeout(typingTimer);
        
        const username = this.value.trim();
        
        if (username === '') {
            messageDiv.innerHTML = '';
            submitBtn.disabled = true;
            return;
        }
        
        loader.style.display = 'block';
        
        typingTimer = setTimeout(() => {
            checkUsername(username);
        }, doneTypingInterval);
    });

    function checkUsername(username) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'usernames.json', true);
        
        xhr.onload = function() {
            loader.style.display = 'none';
            
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const takenUsernames = data.users;
                
                if (takenUsernames.includes(username.toLowerCase())) {
                    messageDiv.innerHTML = '❌ Username already taken';
                    messageDiv.style.color = 'red';
                    submitBtn.disabled = true;
                } else {
                    messageDiv.innerHTML = '✅ Username available';
                    messageDiv.style.color = 'green';
                    submitBtn.disabled = false;
                }
            }
        };
        
        xhr.onerror = function() {
            loader.style.display = 'none';
            messageDiv.innerHTML = 'Error checking username';
            messageDiv.style.color = 'red';
        };
        
        xhr.send();
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Registration successful!');
    });
});