document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const studentId = document.getElementById('studentId');
    const studentName = document.getElementById('studentName');
    const studentCourse = document.getElementById('studentCourse');
    const studentMarks = document.getElementById('studentMarks');
    const editIndex = document.getElementById('editIndex');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const messageDiv = document.getElementById('message');
    const studentsTableBody = document.getElementById('studentsTableBody');
    
    let studentsData = [];
    
    function showMessage(text, isError) {
        messageDiv.textContent = text;
        messageDiv.style.color = isError ? 'red' : 'green';
        setTimeout(() => messageDiv.textContent = '', 3000);
    }
    
    function validateForm() {
        if (!studentId.value || !studentName.value || !studentCourse.value || !studentMarks.value) {
            showMessage('All fields are required', true);
            return false;
        }
        
        const marks = parseInt(studentMarks.value);
        if (isNaN(marks) || marks < 0 || marks > 100) {
            showMessage('Marks must be between 0 and 100', true);
            return false;
        }
        
        if (editIndex.value === '-1') {
            const exists = studentsData.some(s => s.id === studentId.value);
            if (exists) {
                showMessage('Student ID already exists', true);
                return false;
            }
        }
        
        return true;
    }
    
    function loadStudents() {
        fetch('students.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load data');
                }
                return response.json();
            })
            .then(data => {
                studentsData = data.students;
                displayStudents();
                showMessage('Students loaded successfully', false);
            })
            .catch(error => {
                studentsTableBody.innerHTML = '<tr><td colspan="5">Error loading students</td></tr>';
                showMessage('Error: ' + error.message, true);
            });
    }
    
    function displayStudents() {
        if (studentsData.length === 0) {
            studentsTableBody.innerHTML = '<tr><td colspan="5">No students found</td></tr>';
            return;
        }
        
        let html = '';
        studentsData.forEach((student, index) => {
            html += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.course}</td>
                    <td>${student.marks}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
        studentsTableBody.innerHTML = html;
    }
    
    window.editStudent = function(index) {
        const student = studentsData[index];
        studentId.value = student.id;
        studentName.value = student.name;
        studentCourse.value = student.course;
        studentMarks.value = student.marks;
        editIndex.value = index;
        submitBtn.textContent = 'Update Student';
        cancelBtn.style.display = 'block';
    };
    
    window.deleteStudent = function(index) {
        if (!confirm('Delete this student?')) return;
        
        studentsData.splice(index, 1);
        displayStudents();
        showMessage('Student deleted', false);
    };
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const student = {
            id: studentId.value,
            name: studentName.value,
            course: studentCourse.value,
            marks: parseInt(studentMarks.value)
        };
        
        if (editIndex.value === '-1') {
            studentsData.push(student);
            showMessage('Student added', false);
        } else {
            studentsData[editIndex.value] = student;
            showMessage('Student updated', false);
        }
        
        displayStudents();
        form.reset();
        editIndex.value = '-1';
        submitBtn.textContent = 'Add Student';
        cancelBtn.style.display = 'none';
    });
    
    cancelBtn.addEventListener('click', function() {
        form.reset();
        editIndex.value = '-1';
        submitBtn.textContent = 'Add Student';
        cancelBtn.style.display = 'none';
    });
    
    cancelBtn.style.display = 'none';
    loadStudents();
}); 