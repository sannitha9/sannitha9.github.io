const form = document.getElementById('todo-form');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', load);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText, false);
    save(taskText,false);
    taskInput.value = '';
  }
});

function addTask(text, completed) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    update(text, checkbox.checked);
  });

  const span = document.createElement('div');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '✖';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    remove(text);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function save(text, completed){
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({text, completed});
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function update(text, completed){
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let task;
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].text==text){
      task=tasks[i];
      break;
    }
  }
  task.completed=completed;
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function remove(text){
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let t=[];
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].text != text){
      t.push(tasks[i]);
    }
  }
  tasks = t;
  localStorage.setItem('tasks',JSON.stringify(t));
}

function load(){
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  for(let i=0;i<tasks.length;i++){
    addTask(tasks[i].text, tasks[i].completed);
  }
}

