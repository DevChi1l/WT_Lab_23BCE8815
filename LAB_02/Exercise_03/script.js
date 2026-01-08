let taskId = 0;

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const messageDiv = document.getElementById('message');
    
    addTaskBtn.addEventListener('click', function() {
        const taskName = taskInput.value.trim();
        
        if (taskName === '') {
            return;
        }
        
        createTask(taskName);
        taskInput.value = '';
    });
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });
    
    const todoList = document.getElementById('todo-list');
    const progressList = document.getElementById('progress-list');
    const completedList = document.getElementById('completed-list');
    
    function createTask(name) {
        taskId++;
        
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.id = 'task-' + taskId;
        taskCard.draggable = true;
        
        const currentDate = new Date().toLocaleDateString();
        
        taskCard.innerHTML = `
            <div class="task-name">${name}</div>
            <div class="task-date">${currentDate}</div>
        `;
        
        taskCard.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', taskCard.id);
            setTimeout(() => {
                taskCard.classList.add('dragging');
            }, 0);
        });
        
        taskCard.addEventListener('dragend', function() {
            taskCard.classList.remove('dragging');
        });
        
        const columns = [todoList, progressList, completedList];
        columns.forEach(column => {
            column.addEventListener('dragover', function(e) {
                e.preventDefault();
            });
            
            column.addEventListener('drop', function(e) {
                e.preventDefault();
                const taskId = e.dataTransfer.getData('text/plain');
                const task = document.getElementById(taskId);
                
                if (task && column.contains(task) === false) {
                    column.appendChild(task);
                    
                    if (column === completedList) {
                        task.classList.add('completed');
                        messageDiv.textContent = 'Task Completed Successfully';
                        
                        setTimeout(() => {
                            messageDiv.textContent = '';
                        }, 2000);
                    } else {
                        task.classList.remove('completed');
                    }
                }
            });
        });
        
        todoList.appendChild(taskCard);
    }
});