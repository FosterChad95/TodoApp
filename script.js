const list = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const checkboxParent = document.querySelector(".todo");
const clearCompleted = document.querySelector(".clear");
let counter = 0;

function addTodo(event) {
  const html = `
  <li class="todo-item">
  <input type="checkbox" class="todo-checkbox" />
  <span class="text">${event.target.value}</span>
  </li>`;
  list.insertAdjacentHTML("afterbegin", html);
  localStorage.setItem("list", list.innerHTML);
  counter++;
}

function removeTodo(element) {
  if (!element) return;
  element.classList.toggle("checked");
  const todoText = document.querySelector(".text");
  todoText.classList.toggle("striked");
  localStorage.setItem("list", list.innerHTML);
  counter--;
}

function clearTodo() {}

function itemsLeft() {}

function init() {
  //Loading Local Storage on Load
  list.innerHTML = localStorage.getItem("list");
  localStorage.clear();

  //EVENT LISTENERS

  checkboxParent.addEventListener("click", function (e) {
    const clicked = e.target.closest(".todo-checkbox");
    removeTodo(clicked);
  });

  todoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      addTodo(e);
    }
  });
}
init();
