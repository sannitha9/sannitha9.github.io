const form = document.getElementById('todo-form');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

function addTask(text) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
  });

  const span = document.createElement('div');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '✖';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}
