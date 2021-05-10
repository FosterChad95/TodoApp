const list = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const checkboxParent = document.querySelector(".todo");
const clearCompleted = document.querySelector(".clear");
const numberItems = document.querySelector(".number");
const filterAll = document.querySelector(".filter-all");
const filterActive = document.querySelector(".filter-active");
const filterCompleted = document.querySelector(".filter-completed");
const titleInput = document.querySelector(".title");
const todoImage = document.querySelector(".todo__image");
const themeButton = document.querySelector(".btn");
let counter = 0;
let items = [];

function clickTheme() {
  if (themeButton.classList.contains("light")) {
    setTheme("theme-dark");
    themeButton.classList.remove("light");
    themeButton.classList.add("dark");
    themeButton.innerHTML = "";
    themeButton.innerHTML = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    class="icon dark"
  >
    <path
      fill="#FFF"
      fill-rule="evenodd"
      d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
    />
  </svg>`;
  } else {
    setTheme("theme-light");
    themeButton.classList.remove("dark");
    themeButton.classList.add("light");
    themeButton.innerHTML = "";
    themeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="icon light"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
  }
}

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.className = theme;
  if (todoImage.classList.contains("dark")) {
    todoImage.classList.remove("dark");
    todoImage.classList.add("light");
    todoImage.src = "images/bg-desktop-light.jpg";
  } else {
    todoImage.classList.remove("light");
    todoImage.classList.add("dark");
    todoImage.src = "images/bg-desktop-dark.jpg";
  }
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}

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
  localStorage.setItem("items", JSON.stringify(items));
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
  itemsLeft();
}

function itemsLeft(num) {
  if (num) {
    counter = num;
    numberItems.textContent = counter + " ";
  }
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
  //Determining Theme at start up

  setTheme("theme-dark");
  //Rendering the inital list
  renderList();
  //Disabling All Filter at start
  disableAll(filterAll);

  itemsLeft(items.filter((item) => item.completed === false).length);
  //EVENT LISTENERS

  themeButton.addEventListener("click", clickTheme);
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
