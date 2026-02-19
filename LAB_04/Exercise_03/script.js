document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const studentId = document.getElementById('studentId');
    const studentName = document.getElementById('studentName');
    const department = document.getElementById('department');
    const marks = document.getElementById('marks');
    const editIndex = document.getElementById('editIndex');
    const submitBtn = document.getElementById('submitBtn');
    const cancelEdit = document.getElementById('cancelEdit');
    const messageDiv = document.getElementById('message');
    const studentsTableBody = document.getElementById('studentsTableBody');
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.style.color = type === 'success' ? 'green' : 'red';
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 3000);
    }
    
    function loadStudents() {
        studentsTableBody.innerHTML = '<tr><td colspan="5" class="loading">Loading students...</td></tr>';
        
        fetch('students.json')
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) throw new Error('File not found');
                    if (response.status === 500) throw new Error('Server error');
                    throw new Error('Failed to load');
                }
                return response.json();
            })
            .then(data => {
                displayStudents(data.students);
            })
            .catch(error => {
                studentsTableBody.innerHTML = `<tr><td colspan="5" class="loading">Error: ${error.message}</td></tr>`;
                showMessage('Failed to load students', 'error');
            });
    }
    
    function displayStudents(students) {
        if (students.length === 0) {
            studentsTableBody.innerHTML = '<tr><td colspan="5" class="loading">No students found</td></tr>';
            return;
        }
        
        let html = '';
        students.forEach((student, index) => {
            html += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.department}</td>
                    <td>${student.marks}</td>
                    <td>
                        <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
                        <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
        studentsTableBody.innerHTML = html;
    }
    
    window.editStudent = function(index) {
        fetch('students.json')
            .then(response => response.json())
            .then(data => {
                const student = data.students[index];
                studentId.value = student.id;
                studentName.value = student.name;
                department.value = student.department;
                marks.value = student.marks;
                editIndex.value = index;
                submitBtn.textContent = 'Update Student';
                cancelEdit.style.display = 'block';
            });
    };
    
    window.deleteStudent = function(index) {
        if (!confirm('Are you sure?')) return;
        
        fetch('students.json')
            .then(response => response.json())
            .then(data => {
                data.students.splice(index, 1);
                saveStudents(data.students);
                showMessage('Student deleted', 'success');
                loadStudents();
            });
    };
    
    function saveStudents(students) {
        localStorage.setItem('students', JSON.stringify({students: students}));
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!studentId.value || !studentName.value || !department.value || !marks.value) {
            showMessage('All fields required', 'error');
            return;
        }
        
        const newStudent = {
            id: studentId.value,
            name: studentName.value,
            department: department.value,
            marks: parseInt(marks.value)
        };
        
        fetch('students.json')
            .then(response => response.json())
            .then(data => {
                const students = data.students;
                
                if (editIndex.value === '-1') {
                    students.push(newStudent);
                    showMessage('Student added', 'success');
                } else {
                    students[editIndex.value] = newStudent;
                    showMessage('Student updated', 'success');
                }
                
                saveStudents(students);
                loadStudents();
                form.reset();
                editIndex.value = '-1';
                submitBtn.textContent = 'Add Student';
                cancelEdit.style.display = 'none';
            });
    });
    
    cancelEdit.addEventListener('click', function() {
        form.reset();
        editIndex.value = '-1';
        submitBtn.textContent = 'Add Student';
        cancelEdit.style.display = 'none';
    });
    
    cancelEdit.style.display = 'none';
    loadStudents();
    
    const originalFetch = window.fetch;
    window.fetch = function(url) {
        if (url === 'students.json') {
            const stored = localStorage.getItem('students');
            if (stored) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(JSON.parse(stored))
                });
            }
        }
        return originalFetch(url);
    };
});