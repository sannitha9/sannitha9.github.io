const form = document.getElementById('todo-form');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', load);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let index=tasks.length+1;
  if (taskText !== '') {
    addTask(index, taskText, false);
    save(index, taskText, false);
    taskInput.value = '';
  }
});

function addTask(index, text, completed) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked=completed;
  if(completed){
    li.classList.add('completed');
  }
  else{
    li.classList.remove('completed');
  }
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    update(index, text, checkbox.checked);
  });

  const span = document.createElement('div');
  span.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '✖';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    remove(index);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function save(index, text, completed){
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({index, text, completed});
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function update(index, text, completed){
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let ind;
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].text==text && tasks[i].index==index){
      ind=i;
      break;
    }
  }
  tasks[ind].completed=completed;
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function remove(index){
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let t=[];
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].index!=index){
      t.push(tasks[i]);
    }
  }
  tasks = t;
  for(let i=0;i<tasks.length;i++){
    tasks[i].index=i+1;
  }
  localStorage.setItem('tasks',JSON.stringify(t));
}

function load(){
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  for(let i=0;i<tasks.length;i++){
    addTask(tasks[i].index, tasks[i].text, tasks[i].completed);
  }
}

