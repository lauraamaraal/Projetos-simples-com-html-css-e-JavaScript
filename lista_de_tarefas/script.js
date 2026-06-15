const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');


let tasks = [];


const exampleTasks = [
  { id: 101, text: "📖 ler 20 páginas do livro", completed: false },
  { id: 102, text: "🧪 estudar para prova de química", completed: true },
  { id: 103, text: "🏀 treino de basquete 4pm", completed: false }
];

function loadTasks() {
  const saved = localStorage.getItem('hs_todos');
  if (saved) {
    tasks = JSON.parse(saved);
  } else {
    tasks = [...exampleTasks];
  }
  render();
}

function saveTasks() {
  localStorage.setItem('hs_todos', JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    taskInput.placeholder = "⚠️ escreve algo! ⚠️";
    setTimeout(() => {
      taskInput.placeholder = "Ex: estudar para a prova...";
    }, 1200);
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  render();
  taskInput.value = "";
  taskInput.focus();
}


function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}


function render() {
  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="empty">✨ Nenhuma tarefa! adicione algo ✨</li>';
    return;
  }


  const fragment = document.createDocumentFragment();

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');


    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';
    contentDiv.addEventListener('click', () => toggleComplete(task.id));


    const checkSpan = document.createElement('span');
    checkSpan.className = 'check-custom';
    checkSpan.textContent = task.completed ? '✓' : '';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    contentDiv.appendChild(checkSpan);
    contentDiv.appendChild(textSpan);


    const delBtn = document.createElement('button');
    delBtn.className = 'delete-task';
    delBtn.textContent = 'DELETE';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();  // impede de marcar como concluído ao clicar no delete
      deleteTask(task.id);
    });

    li.appendChild(contentDiv);
    li.appendChild(delBtn);
    fragment.appendChild(li);
  });

  taskList.innerHTML = '';
  taskList.appendChild(fragment);
}

function init() {
  loadTasks();
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });
  taskInput.focus();
}

init();