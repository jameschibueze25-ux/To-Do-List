const addBtn = document.getElementById('add-btn');
const input = document.getElementById('todo-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const emptyMessage = document.getElementById('empty-message');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';

function loadTasks() {
  const saved = localStorage.getItem('todo-tasks');
  tasks = saved ? JSON.parse(saved) : [];
}

function saveTasks() {
  localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  emptyMessage.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach(task => {
    const li = document.createElement('li');

    // CHECKBOX
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // TASK TEXT — click to edit inline
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    taskSpan.title = 'Click to edit';
    if (task.completed) taskSpan.style.textDecoration = 'line-through';

    taskSpan.addEventListener('click', () => {
      if (task.completed) return;
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.classList.add('edit-input');
      editInput.value = task.text;
      li.replaceChild(editInput, taskSpan);
      editInput.focus();

      function saveEdit() {
        const newText = editInput.value.trim();
        if (newText) {
          task.text = newText;
          taskSpan.textContent = newText;
        }
        li.replaceChild(taskSpan, editInput);
        saveTasks();
      }

      editInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') saveEdit();
        if (e.key === 'Escape') li.replaceChild(taskSpan, editInput);
      });
      editInput.addEventListener('blur', saveEdit);
    });

    // DELETE BUTTON
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.classList.add('icon-btn');
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

function updateCounter() {
  const activeCount = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${activeCount} task${activeCount !== 1 ? 's' : ''} left`;

  const hasCompleted = tasks.some(t => t.completed);
  clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden';
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  saveTasks();
  renderTasks();
  input.value = '';
}

// Add task on button click or Enter key
addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });

// Filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Clear completed
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
});

// Initialize
loadTasks();
renderTasks();
