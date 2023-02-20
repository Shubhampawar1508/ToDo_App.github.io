const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const totalCount = document.querySelector('#total-count');
const completedCount = document.querySelector('#completed-count');
const pendingCount = document.querySelector('#pending-count');

let todos = [];

function renderTodos() {
  // Clear existing list items
  todoList.innerHTML = '';

  // Render new list items
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}" />
        <span class="checkmark"></span>
        <span>${todo.text}</span>
      </label>
      <button data-index="${index}">Delete</button>
    `;
    if (todo.completed) {
      li.classList.add('completed');
    }
    li.querySelector('input').addEventListener('change', () => {
      toggleComplete(index);
    });
    const deleteButton = li.querySelector('button');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteTodo(index);
    });
    todoList.appendChild(li);
  });

  // Update counters
  totalCount.innerText = todos.length;
  completedCount.innerText = todos.filter(todo => todo.completed).length;
  pendingCount.innerText = todos.filter(todo => !todo.completed).length;
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') {
    return;
  }
  todos.push({ text: todoText, completed: false });
  todoInput.value = '';
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

renderTodos();
