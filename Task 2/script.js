// Form Validation with JavaScript
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous states
    resetFormStates();
    
    let isValid = true;

    // Validate Name
    const name = document.getElementById('name');
    const nameValue = name.value.trim();
    if (nameValue === '' || nameValue.length < 3) {
        showError('name', 'nameError');
        isValid = false;
    } else {
        showSuccess('name');
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        showError('email', 'emailError');
        isValid = false;
    } else {
        showSuccess('email');
    }

    // Validate Phone (optional but if provided, should be valid)
    const phone = document.getElementById('phone');
    const phoneValue = phone.value.trim();
    if (phoneValue !== '') {
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        if (!phoneRegex.test(phoneValue)) {
            showError('phone', 'phoneError');
            isValid = false;
        } else {
            showSuccess('phone');
        }
    }

    // Validate Message
    const message = document.getElementById('message');
    const messageValue = message.value.trim();
    if (messageValue === '' || messageValue.length < 10) {
        showError('message', 'messageError');
        isValid = false;
    } else {
        showSuccess('message');
    }

    // If all validations pass
    if (isValid) {
        formSuccess.classList.add('show');
        
        // Log form data to console
        console.log('Form Submitted!');
        console.log('Name:', nameValue);
        console.log('Email:', emailValue);
        console.log('Phone:', phoneValue);
        console.log('Message:', messageValue);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            formSuccess.classList.remove('show');
            resetFormStates();
        }, 3000);
    }
});

function showError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add('error');
    input.classList.remove('success');
    error.classList.add('show');
}

function showSuccess(inputId) {
    const input = document.getElementById(inputId);
    input.classList.add('success');
    input.classList.remove('error');
}

function resetFormStates() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    const errors = contactForm.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    errors.forEach(error => {
        error.classList.remove('show');
    });
}

// Dynamic To-Do List with DOM Manipulation
let todos = [];

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        todoInput.style.borderColor = '#ff4757';
        setTimeout(() => {
            todoInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }, 1000);
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todo);
    todoInput.value = '';
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    
    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <span>📝</span>
                <p>No tasks yet!</p>
                <p style="font-size: 0.9rem; opacity: 0.7;">Add your first task above to get started</p>
            </div>
        `;
        return;
    }

    todoList.innerHTML = todos.map(todo => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="todo-btn complete-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? '↩ Undo' : '✓ Done'}
                </button>
                <button class="todo-btn delete-btn" onclick="deleteTodo(${todo.id})">
                    🗑 Delete
                </button>
            </div>
        </li>
    `).join('');
}

// Allow Enter key to add todo
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initialize empty todo list
renderTodos();