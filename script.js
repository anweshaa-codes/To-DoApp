//Start button
function goToTodo() {
  window.location.href = "todo.html";
}

//Add new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = createTaskElement(taskText, false);
  document.getElementById('pendingList').appendChild(task);
  saveTasks();
  taskInput.value = "";
}

// text and delete button
function createTaskElement(text, isDone) {
  const task = document.createElement('div');
  task.className = 'task';
  task.innerHTML = `<span>${text}</span>
    <button class="delete" onclick="deleteTask(this)">✕</button>`;

  if (!isDone) {
    task.onclick = function (e) {
      if (e.target.tagName !== "BUTTON") {
        markAsDone(task);
      }
    };
  } else {
    task.style.textDecoration = "line-through";
    task.style.opacity = "0.7";
  }

  return task;
}

// Marks task as done
function markAsDone(task) {
  task.onclick = null;
  task.style.textDecoration = "line-through";
  task.style.opacity = "0.7";
  document.getElementById('completedList').appendChild(task);
  saveTasks();
}

// Deletes task from list
function deleteTask(button) {
  const task = button.parentElement;
  task.remove();
  saveTasks();
}

// Saves tasks in local storage
function saveTasks() {
  const pending = [];
  document.querySelectorAll('#pendingList .task span').forEach(span => {
    pending.push(span.textContent);
  });

  const completed = [];
  document.querySelectorAll('#completedList .task span').forEach(span => {
    completed.push(span.textContent);
  });

  localStorage.setItem("pendingTasks", JSON.stringify(pending));
  localStorage.setItem("completedTasks", JSON.stringify(completed));
}

// Loads saved tasks when page opens
window.onload = function () {
  if (window.location.pathname.includes("todo.html")) {
    const pending = JSON.parse(localStorage.getItem("pendingTasks")) || [];
    const completed = JSON.parse(localStorage.getItem("completedTasks")) || [];

    pending.forEach(text => {
      const task = createTaskElement(text, false);
      document.getElementById('pendingList').appendChild(task);
    });

    completed.forEach(text => {
      const task = createTaskElement(text, true);
      document.getElementById('completedList').appendChild(task);
    });
  }
};

