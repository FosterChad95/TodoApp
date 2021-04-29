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
  if (event.target.value.length < 1) return;
  const html = `
    <li class="todo-item">
    <input type="checkbox" class="todo-checkbox" />
    <span class="text">${event.target.value.trim()}</span>
    </li>`;
  list.insertAdjacentHTML("afterbegin", html);
  event.target.value = "";
  localStorage.setItem("list", list.innerHTML);
  counter++;
  itemsLeft();
}

function removeTodo(element) {
  if (!element) return;
  element.classList.toggle("checked");
  element.nextElementSibling.classList.toggle("striked");
  localStorage.setItem("list", list.innerHTML);

  element.classList.contains("checked") && counter >= 0 ? counter-- : counter++;

  itemsLeft();
}

function clearTodo() {
  const items = document.querySelectorAll(".todo-item");
  items.forEach((el) => {
    if (el.firstElementChild.classList.contains("checked")) {
      el.parentElement.removeChild(el);
    }
  });
}

function itemsLeft() {
  numberItems.textContent = counter + " ";
}

function activeFiltered() {
  filterCompleted.classList.remove("disabled");
  filterAll.classList.remove("disabled");
  const items = list.querySelectorAll(".todo-item");
  const activeItems = [];
  const completedItems = [];

  if (localStorage.getItem("active")) {
    activeItems.push(localStorage.getItem("active"));
  }

  items.forEach((item) => {
    if (!item.firstElementChild.classList.contains("checked")) {
      activeItems.push(item.outerHTML);
    } else {
      completedItems.push(item.outerHTML);
    }
  });
  list.innerHTML = "";
  localStorage.setItem("completed", completedItems.join(""));
  localStorage.setItem("active", activeItems.join(""));
  const html = activeItems.join("");
  list.insertAdjacentHTML("afterbegin", html);
  filterActive.classList.toggle("disabled");
}

function completedFiltered() {
  filterActive.classList.remove("disabled");
  filterAll.classList.remove("disabled");
  const items = list.querySelectorAll(".todo-item");
  const activeItems = [];
  const completedItems = [];
  if (localStorage.getItem("completed")) {
    completedItems.push(localStorage.getItem("completed"));
  }
  items.forEach((item) => {
    if (item.firstElementChild.classList.contains("checked")) {
      completedItems.push(item.outerHTML);
    } else {
      activeItems.push(item.outerHTML);
    }
  });
  list.innerHTML = "";
  localStorage.setItem("completed", completedItems.join(""));
  localStorage.setItem("active", activeItems.join(""));
  const html = completedItems.join("");
  list.insertAdjacentHTML("afterbegin", html);
  filterCompleted.classList.toggle("disabled");
}

function disableAll() {
  filterAll.classList.add("disabled");
}

function allFiltered() {
  filterActive.classList.remove("disabled");
  filterCompleted.classList.remove("disabled");
  const items = list.querySelectorAll(".todo-item");
  const activeItems = [];
  const completedItems = [];
  if (localStorage.getItem("completed")) {
    completedItems.push(localStorage.getItem("completed"));
  }
  if (localStorage.getItem("active")) {
    activeItems.push(localStorage.getItem("active"));
  }
  items.forEach((item) => {
    if (item.firstElementChild.classList.contains("checked")) {
      completedItems.push(item.outerHTML);
    } else {
      activeItems.push(item.outerHTML);
    }
  });
  list.innerHTML = "";
  localStorage.setItem("completed", completedItems.join(""));
  localStorage.setItem("active", activeItems.join(""));
  const html = completedItems.concat(activeItems).join("");
  list.insertAdjacentHTML("afterbegin", html);
  filterAll.classList.toggle("disabled");
}

function init() {
  //Loading Local Storage on Load
  list.innerHTML = localStorage.getItem("list");
  localStorage.clear();

  //Disabling All Filter at start
  disableAll();

  itemsLeft();
  //EVENT LISTENERS

  filterActive.addEventListener("click", activeFiltered);
  filterAll.addEventListener("click", allFiltered);
  filterCompleted.addEventListener("click", completedFiltered);

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
