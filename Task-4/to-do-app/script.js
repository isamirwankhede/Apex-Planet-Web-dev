let tasks = [];
        let currentFilter = 'all';

        // Load tasks from localStorage
        function loadTasks() {
            const saved = localStorage.getItem('todoTasks');
            if (saved) {
                tasks = JSON.parse(saved);
            }
        }

        // Save tasks to localStorage
        function saveTasks() {
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
        }

        // Add new task
        function addTask() {
            const input = document.getElementById('taskInput');
            const text = input.value.trim();
            
            if (!text) return;

            const task = {
                id: Date.now(),
                text: text,
                completed: false
            };

            tasks.unshift(task);
            saveTasks();
            input.value = '';
            renderTasks();
        }

        // Toggle task complete/incomplete
        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            }
        }

        // Delete a task
        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            saveTasks();
            renderTasks();
        }

        // Clear all completed tasks
        function clearCompleted() {
            tasks = tasks.filter(t => !t.completed);
            saveTasks();
            renderTasks();
        }

        // Get filtered tasks
        function getFilteredTasks() {
            if (currentFilter === 'active') {
                return tasks.filter(t => !t.completed);
            } else if (currentFilter === 'completed') {
                return tasks.filter(t => t.completed);
            }
            return tasks;
        }

        // Update stats
        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const active = total - completed;

            document.getElementById('totalCount').textContent = total;
            document.getElementById('activeCount').textContent = active;
            document.getElementById('completedCount').textContent = completed;
        }

        // Display tasks
        function renderTasks() {
            const taskList = document.getElementById('taskList');
            const filteredTasks = getFilteredTasks();
            
            if (filteredTasks.length === 0) {
                taskList.innerHTML = '<div class="empty-state">📝<p>No tasks yet!</p></div>';
            } else {
                taskList.innerHTML = '';
                filteredTasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = 'task-item' + (task.completed ? ' completed' : '');
                    li.innerHTML = `
                        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                        <span class="task-text">${task.text}</span>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    `;
                    taskList.appendChild(li);
                });
            }
            updateStats();
        }

        // Setup when page loads
        window.onload = function() {
            loadTasks();
            renderTasks();

            document.getElementById('addBtn').onclick = addTask;
            
            document.getElementById('taskInput').onkeypress = function(e) {
                if (e.key === 'Enter') addTask();
            };

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.onclick = function() {
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.dataset.filter;
                    renderTasks();
                };
            });

            document.getElementById('clearCompleted').onclick = clearCompleted;
        };