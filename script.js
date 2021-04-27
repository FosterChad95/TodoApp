const list = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const checkboxParent = document.querySelector(".todo");
const clearCompleted = document.querySelector(".clear");
const numberItems = document.querySelector(".number");
const filterAll = document.querySelector(".filter-all");
const filterActive = document.querySelector(".filter-active");
const filterCompleted = document.querySelector(".filter-completed");
let counter = 0;

function addTodo(event) {
  const html = `
    <li class="todo-item">
    <input type="checkbox" class="todo-checkbox" />
    <span class="text">${event.target.value}</span>
    </li>`;
  if (event.target.value.length < 1) return;
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
  const items = document.querySelectorAll(".todo-item");
  items.forEach((el, i) => {
    if (el.firstElementChild.classList.contains("checked")) {
      el.parentElement.removeChild(el);
    }
  });
}

function filterTodo(event) {}

function itemsLeft() {
  numberItems.textContent = counter + " ";
}

function init() {
  //Loading Local Storage on Load
  list.innerHTML = localStorage.getItem("list");
  localStorage.clear();

  itemsLeft();
  //EVENT LISTENERS

  [filterActive, filterAll, filterCompleted].forEach((element) =>
    element.addEventListener("click", filterTodo)
  );

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
