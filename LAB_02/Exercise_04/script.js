document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');
    const usersTableBody = document.getElementById('usersTableBody');
    const clearAllBtn = document.getElementById('clearAllBtn');

    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function renderUsers() {
        const users = getUsers();
        usersTableBody.innerHTML = '';
        
        if (users.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td colspan="4" style="text-align: center; color: #666;">
                    No users registered yet
                </td>
            `;
            usersTableBody.appendChild(row);
            return;
        }
        
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const users = getUsers();
                users.splice(index, 1);
                saveUsers(users);
                renderUsers();
                showMessage('User deleted successfully', 'success');
            });
        });
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        if (type === 'success') {
            messageDiv.style.color = 'green';
        } else {
            messageDiv.style.color = 'red';
        }
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 3000);
    }

    function validateForm() {
        if (nameInput.value.trim() === '') {
            showMessage('Please enter a name', 'error');
            return false;
        }
        
        if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
            showMessage('Please enter a valid email', 'error');
            return false;
        }
        
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobileInput.value)) {
            showMessage('Mobile must be 10 digits', 'error');
            return false;
        }
        
        if (passwordInput.value.length < 6) {
            showMessage('Password must be at least 6 characters', 'error');
            return false;
        }
        
        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const newUser = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            mobile: mobileInput.value,
            password: passwordInput.value
        };

        const users = getUsers();
        const emailExists = users.some(user => user.email === newUser.email);
        
        if (emailExists) {
            showMessage('Email already registered', 'error');
            return;
        }

        users.push(newUser);
        saveUsers(users);
        renderUsers();
        showMessage('User registered successfully', 'success');
        form.reset();
    });

    clearAllBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete all users?')) {
            localStorage.removeItem('users');
            renderUsers();
            showMessage('All users deleted', 'success');
        }
    });

    renderUsers();
});