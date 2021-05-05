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
  localStorage.setItem("items", JSON.stringify(items));

  event.target.value = "";
  renderList();

  counter++;
  itemsLeft();
}

function renderList(type = "all") {
  if (type === "all") {
    const allItems = items
      .map((item) => {
        if (item.completed) {
          return `
    <li class="todo-item" data-id= ${item.id}>
    <input type="checkbox" class="todo-checkbox checked" />
    <span class="text striked">${item.text}</span>
    </li>`;
        } else {
          return `
        <li class="todo-item" data-id= ${item.id}>
        <input type="checkbox" class="todo-checkbox" />
        <span class="text">${item.text}</span>
        </li>`;
        }
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
  if (type === "Completed") {
    const allItems = items
      .filter((item) => item.completed === true)
      .map((item) => {
        return `
    <li class="todo-item" data-id= ${item.id}>
    <input type="checkbox" class="todo-checkbox checked" />
    <span class="text striked">${item.text}</span>
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

  element.classList.contains("checked") && counter >= 0 ? counter-- : counter++;
  itemsLeft();
}

function clearTodo() {
  items.forEach((elements, index) => {
    if (elements.completed === true) {
      items.splice(index, 1);
    }
  });

  if (filterAll.classList.contains("disabled") || list.childNodes.length < 1) {
    renderList();
  }
  if (filterActive.classList.contains("disabled")) {
    renderList("Active");
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

  filterActive.classList.add("disabled");
  renderList("Active");
}

function completedFiltered() {
  filterActive.classList.remove("disabled");
  filterAll.classList.remove("disabled");
  filterCompleted.classList.add("disabled");
  renderList("Completed");
}

function disableAll() {
  filterAll.classList.add("disabled");
}

function allFiltered() {
  renderList();
  filterActive.classList.remove("disabled");
  filterCompleted.classList.remove("disabled");

  filterAll.classList.add("disabled");
}

function init() {
  //Loading Local Storage on Load
  if (localStorage.getItem("items")) {
    JSON.parse(localStorage.getItem("items")).forEach((item) =>
      items.push(item)
    );
  }
  renderList();
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
