const list = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const checkboxParent = document.querySelector(".todo");
const clearCompleted = document.querySelector(".clear");
const numberItems = document.querySelector(".number");
const filterAll = document.querySelector(".filter-all");
const filterActive = document.querySelector(".filter-active");
const filterCompleted = document.querySelector(".filter-completed");
const titleInput = document.querySelector(".title");
let counter = 0;
let items = [];

function addTodo(event) {
  if (event.target.value.trim().length < 1) return;

  const listItem = {
    text: event.target.value.trim(),
    completed: false,
    id: Math.random(),
  };

  items.push(listItem);

  event.target.value = "";
  renderList();
  // localStorage.setItem("list", list.innerHTML);
  counter++;
  itemsLeft();
}

function renderList(type = "all") {
  if (type === "all") {
    const allItems = items
      .map((item) => {
        return `
    <li class="todo-item" data-id= ${item.id}>
    <input type="checkbox" class="todo-checkbox" />
    <span class="text">${item.text}</span>
    </li>`;
      })
      .join("");
    list.innerHTML = "";
    list.insertAdjacentHTML("afterbegin", allItems);
  }

  if (type === "Active") {
    const allItems = items
      .filter((item) => item.completed === false)
      .map((item) => {
        return `
    <li class="todo-item" data-id= ${item.id}>
    <input type="checkbox" class="todo-checkbox" />
    <span class="text">${item.text}</span>
    </li>`;
      })
      .join("");
    list.innerHTML = "";
    list.insertAdjacentHTML("afterbegin", allItems);
  }
}

function toggleTodo(element) {
  if (!element) return;
  element.classList.toggle("checked");
  element.nextElementSibling.classList.toggle("striked");
  items.forEach((listItem, i) => {
    if (listItem.id === Number(element.parentElement.dataset.id)) {
      const bool = listItem.completed ? false : true;
      items[i].completed = bool;
    }
  });
  localStorage.setItem("list", list.innerHTML);
  element.classList.contains("checked") && counter >= 0 ? counter-- : counter++;
  itemsLeft();
}

function clearTodo() {
  items.forEach((elements, index) => {
    if (elements.completed === true) {
      items.splice(index, index + 1);
    }
  });
  if (filterActive.classList.contains("disabled")) {
    renderList("Active");
  }
  if (filterAll.classList.contains("disabled")) {
    renderList();
  }
  if (filterCompleted.classList.contains("disabled")) {
    renderList("Completed");
  }
}

function itemsLeft() {
  numberItems.textContent = counter + " ";
}

function activeFiltered() {
  filterActive.classList.remove("disabled");
  filterAll.classList.remove("disabled");

  filterActive.classList.toggle("disabled");
  renderList("Active");
}

function completedFiltered() {
  const completedArray = [];
  filterActive.classList.remove("disabled");
  filterAll.classList.remove("disabled");
  if (localStorage.getItem("completeList")) {
    list.innerHTML = "";
    completedArray.push(localStorage.getItem("completeList"));
    const html = completedArray.join("");
    list.insertAdjacentHTML("afterbegin", html);
  } else {
    const checked = document.querySelectorAll(".checked");

    checked.forEach((el) => {
      completedArray.push(el.parentElement.outerHTML);
    });

    list.innerHTML = "";
    const html = completedArray.join("");
    list.insertAdjacentHTML("afterbegin", html);
  }
  filterCompleted.classList.toggle("disabled");
  localStorage.setItem("completeList", list.innerHTML);
  displayHead("Completed Tasks");
}

function displayHead(title) {
  todoInput.classList.add("hide");
  titleInput.classList.remove("hidden");
  const html = `<h3>${title}</h3>`;
  titleInput.innerHTML = "";
  titleInput.insertAdjacentHTML("afterbegin", html);
}

function disableAll() {
  filterAll.classList.add("disabled");
}

function allFiltered() {
  filterActive.classList.remove("disabled");
  filterCompleted.classList.remove("disabled");
  todoInput.classList.remove("hide");
  titleInput.classList.add("hidden");
  const items = document.querySelectorAll(".todo-item");
  if (items.length < 1) return;

  const html = localStorage.getItem("list");
  list.innerHTML = "";
  list.insertAdjacentHTML("afterbegin", html);
  filterAll.classList.add("disabled");
}

function init() {
  //Loading Local Storage on Load
  list.innerHTML = localStorage.getItem("list");
  localStorage.clear();

  //Disabling All Filter at start
  disableAll(filterAll);

  itemsLeft();
  //EVENT LISTENERS

  filterActive.addEventListener("click", activeFiltered);
  filterAll.addEventListener("click", allFiltered);
  filterCompleted.addEventListener("click", completedFiltered);

  clearCompleted.addEventListener("click", clearTodo);

  checkboxParent.addEventListener("click", function (e) {
    const clicked = e.target.closest(".todo-checkbox");
    toggleTodo(clicked);
  });

  todoInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      addTodo(e);
    }
  });
}
init();
