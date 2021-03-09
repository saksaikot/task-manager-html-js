const q = (i) => document.querySelector(i);
const qa = (i) => document.querySelector(i);
const LOCAL_STOR = "tasks";
//elements
const addInput = q("#addInput");
const addBtn = q("#addBtn");
const message = q("#message");
const filterInput = q("#filterInput");
const taskContainer = q("#taskContainer");
const clearBtn = q("#clearBtn");

//events

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearTasks);
filterInput.addEventListener("keyup", filter);

//events actions
function filter(e) {
  Array.from(taskContainer.children).forEach((li) => {
    if (
      li.textContent.toLowerCase().indexOf(filterInput.value.toLowerCase()) !==
      -1
    ) {
      li.style.display = "list-item";
    } else li.style.display = "none";
  });
}
function clearTasks(e) {
  while (taskContainer.firstChild) taskContainer.firstChild.remove();
  storeTasksInLocalStorage([]);
}
function addTask(e) {
  const input = addInput.value;
  if (input === "") message.textContent = "Please add input a task first";
  else {
    message.textContent = "";
    showTaskInContainer(input);
    addInput.value = "";
    storeSingleTaskInLocalStorage(input);
  }
}

function removeTask(e) {
  e.preventDefault();
  // console.log(e.target.parentNode.textContent);
  const parent = e.target.parentNode;
  parent.lastChild.remove();
  removeFromLocalStorage(parent.textContent.trim());
  parent.remove();
}

function showTaskInContainer(input) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = "x";
  a.href = "#";
  a.addEventListener("click", removeTask);
  li.textContent = input + " ";
  li.appendChild(a);
  taskContainer.appendChild(li);
}
function storeSingleTaskInLocalStorage(task) {
  const tasks = getTasks();
  tasks.push(task);
  console.log(tasks);
  // localStorage.setItem(LOCAL_STOR,JSON.stringify(tasks));
  storeTasksInLocalStorage(tasks);
}
function storeTasksInLocalStorage(tasks) {
  localStorage.setItem(LOCAL_STOR, JSON.stringify(tasks));
}
function getTasks() {
  let tasks = localStorage.getItem(LOCAL_STOR);
  if (tasks === null) tasks = [];
  else tasks = JSON.parse(tasks);
  return tasks;
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach((task) => showTaskInContainer(task));
}
loadTasks();
function removeFromLocalStorage(task) {
  const tasks = getTasks();
  tasks.forEach((t, index) => {
    // console.log(t,index,task);
    if (t.indexOf(task) !== -1) tasks.splice(index, 1);
  });
  // console.log(tasks);
  storeTasksInLocalStorage(tasks);
}
