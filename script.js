const list = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const checkboxParent = document.querySelector(".todo");
const clearCompleted = document.querySelector(".clear");
const numberItems = document.querySelector(".number");
let counter = 0;

function addTodo(event) {
  const html = `
    <li class="todo-item">
    <input type="checkbox" class="todo-checkbox" />
    <span class="text">${event.target.value}</span>
    </li>`;
  list.insertAdjacentHTML("afterbegin", html);
  event.target.value = "";
  localStorage.setItem("list", list.innerHTML);
  counter++;
  itemsLeft();
}

function removeTodo(element) {
  if (!element) return;
  const todoText = document.querySelector(".text");
  element.classList.toggle("checked");
  element.nextElementSibling.classList.toggle("striked");
  localStorage.setItem("list", list.innerHTML);

  element.classList.contains("checked") && counter >= 0 ? counter-- : counter++;

  itemsLeft();
}

function clearTodo() {
  list.innerHTML = "";
  localStorage.setItem("list", list.innerHTML);
}

function itemsLeft() {
  numberItems.textContent = counter + " ";
}

function init() {
  //Loading Local Storage on Load
  list.innerHTML = localStorage.getItem("list");
  localStorage.clear();

  itemsLeft();
  //EVENT LISTENERS

  clearCompleted.addEventListener("click", clearTodo);

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
