document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('employeeForm');
    const empId = document.getElementById('empId');
    const empName = document.getElementById('empName');
    const empDept = document.getElementById('empDept');
    const empSalary = document.getElementById('empSalary');
    const editIndex = document.getElementById('editIndex');
    const submitBtn = document.getElementById('submitBtn');
    const cancelEdit = document.getElementById('cancelEdit');
    const messageDiv = document.getElementById('message');
    const employeesTableBody = document.getElementById('employeesTableBody');
    
    let xmlDoc = null;
    let currentEmployees = [];
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.style.color = type === 'success' ? 'green' : 'red';
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 3000);
    }
    
    function loadEmployees() {
        employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">Loading employees...</td></tr>';
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'employees.xml', true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    xmlDoc = xhr.responseXML;
                    
                    if (!xmlDoc || !xmlDoc.documentElement) {
                        throw new Error('Empty or malformed XML');
                    }
                    
                    const employees = xmlDoc.getElementsByTagName('employee');
                    displayEmployees(employees);
                    showMessage('Employees loaded successfully', 'success');
                } catch (e) {
                    employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">Error: Invalid XML format</td></tr>';
                    showMessage('Failed to parse XML', 'error');
                }
            } else {
                employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">Error: Failed to load XML file</td></tr>';
                showMessage('Failed to load employees', 'error');
            }
        };
        
        xhr.onerror = function() {
            employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">Error: Network issue</td></tr>';
            showMessage('Network error', 'error');
        };
        
        xhr.send();
    }
    
    function displayEmployees(employees) {
        if (employees.length === 0) {
            employeesTableBody.innerHTML = '<tr><td colspan="5" class="loading">No employees found</td></tr>';
            return;
        }
        
        currentEmployees = [];
        let html = '';
        
        for (let i = 0; i < employees.length; i++) {
            const emp = employees[i];
            const id = emp.getElementsByTagName('id')[0].textContent;
            const name = emp.getElementsByTagName('name')[0].textContent;
            const dept = emp.getElementsByTagName('department')[0].textContent;
            const salary = emp.getElementsByTagName('salary')[0].textContent;
            
            currentEmployees.push({ id, name, dept, salary });
            
            html += `
                <tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${dept}</td>
                    <td>$${salary}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editEmployee(${i})">Edit</button>
                        <button class="action-btn delete-btn" onclick="deleteEmployee(${i})">Delete</button>
                    </td>
                </tr>
            `;
        }
        
        employeesTableBody.innerHTML = html;
    }
    
    window.editEmployee = function(index) {
        const emp = currentEmployees[index];
        empId.value = emp.id;
        empName.value = emp.name;
        empDept.value = emp.dept;
        empSalary.value = emp.salary;
        editIndex.value = index;
        submitBtn.textContent = 'Update Employee';
        cancelEdit.style.display = 'block';
    };
    
    window.deleteEmployee = function(index) {
        if (!confirm('Are you sure you want to delete this employee?')) return;
        
        try {
            const employees = xmlDoc.getElementsByTagName('employee');
            const employeeToDelete = employees[index];
            employeeToDelete.parentNode.removeChild(employeeToDelete);
            
            displayEmployees(xmlDoc.getElementsByTagName('employee'));
            showMessage('Employee deleted successfully', 'success');
            
        } catch (e) {
            showMessage('Error deleting employee', 'error');
        }
    };
    
    function addEmployeeToXML(newEmp) {
        const employeesNode = xmlDoc.getElementsByTagName('employees')[0];
        
        const employeeNode = xmlDoc.createElement('employee');
        
        const idNode = xmlDoc.createElement('id');
        idNode.textContent = newEmp.id;
        employeeNode.appendChild(idNode);
        
        const nameNode = xmlDoc.createElement('name');
        nameNode.textContent = newEmp.name;
        employeeNode.appendChild(nameNode);
        
        const deptNode = xmlDoc.createElement('department');
        deptNode.textContent = newEmp.dept;
        employeeNode.appendChild(deptNode);
        
        const salaryNode = xmlDoc.createElement('salary');
        salaryNode.textContent = newEmp.salary;
        employeeNode.appendChild(salaryNode);
        
        employeesNode.appendChild(employeeNode);
    }
    
    function updateEmployeeInXML(index, updatedEmp) {
        const employees = xmlDoc.getElementsByTagName('employee');
        const empToUpdate = employees[index];
        
        empToUpdate.getElementsByTagName('id')[0].textContent = updatedEmp.id;
        empToUpdate.getElementsByTagName('name')[0].textContent = updatedEmp.name;
        empToUpdate.getElementsByTagName('department')[0].textContent = updatedEmp.dept;
        empToUpdate.getElementsByTagName('salary')[0].textContent = updatedEmp.salary;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!empId.value || !empName.value || !empDept.value || !empSalary.value) {
            showMessage('All fields are required', 'error');
            return;
        }
        
        const newEmployee = {
            id: empId.value,
            name: empName.value,
            dept: empDept.value,
            salary: empSalary.value
        };
        
        try {
            if (editIndex.value === '-1') {
                addEmployeeToXML(newEmployee);
                showMessage('Employee added successfully', 'success');
            } else {
                updateEmployeeInXML(parseInt(editIndex.value), newEmployee);
                showMessage('Employee updated successfully', 'success');
            }
            
            displayEmployees(xmlDoc.getElementsByTagName('employee'));
            
            form.reset();
            editIndex.value = '-1';
            submitBtn.textContent = 'Add Employee';
            cancelEdit.style.display = 'none';
            
        } catch (e) {
            showMessage('Error saving employee', 'error');
        }
    });
    
    cancelEdit.addEventListener('click', function() {
        form.reset();
        editIndex.value = '-1';
        submitBtn.textContent = 'Add Employee';
        cancelEdit.style.display = 'none';
    });
    
    loadEmployees();
});