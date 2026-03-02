// Get the button and input field
const button = document.getElementById('add-btn');
const input = document.getElementById('todo-input');
const taskList = document.getElementById('list-container');

// When button is clicked, run this function
button.addEventListener('click', addTask);

function addTask() {
  // Get the text from input
  const taskText = input.value;
  
  // Create a new <li> element
  const newTask = document.createElement('li');
  
  // Add the text to the <li>
  newTask.textContent = taskText;
  
  // Add the <li> to the list
  taskList.appendChild(newTask);
  
  // Clear the input field
  input.value = '';
}

function addTask() {
  const taskText = input.value;
  const newTask = document.createElement('li');
  
  // CHECKBOX
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', function() {
    if(checkbox.checked) {
      taskSpan.style.textDecoration = 'line-through';
    } else {
      taskSpan.style.textDecoration = 'none';
    }
  });
  
  // TASK TEXT
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  
  // EDIT BUTTON
  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.addEventListener('click', function() {
    // Create input field
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskSpan.textContent;
    
    // Replace taskSpan with editInput
    newTask.replaceChild(editInput, taskSpan);
    
    // Change Edit button to Save button
    editBtn.textContent = '💾';
    
    // Add Save listener
    editBtn.addEventListener('click', function() {
      // Update taskSpan text
      taskSpan.textContent = editInput.value;
      
      // Replace editInput back with taskSpan
      newTask.replaceChild(taskSpan, editInput);
      
      // Change Save button back to Edit
      editBtn.textContent = '✏️';
    });
  });
  
  // DELETE BUTTON
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.addEventListener('click', function() {
    newTask.remove();
  });
  
  // ADD ALL TO LI
  newTask.appendChild(checkbox);
  newTask.appendChild(taskSpan);
  newTask.appendChild(editBtn);
  newTask.appendChild(deleteBtn);
  
  taskList.appendChild(newTask);
  input.value = '';
}
