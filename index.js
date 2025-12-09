/* ---------- TaskTrack — Reusable task item + app logic ---------- */

// DOM refs
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('TaskList');
const searchInput = document.getElementById('search') || null; // optional if you have a search

// data
let tasks = [];

/**
 * createTaskItem(value)
 * - builds the <li> structure with .task-text then delete button
 * - wires delete handler (updates tasks + localStorage)
 * - returns the <li>
 */
function createTaskItem(value) {
  const li = document.createElement('li');

  const textDiv = document.createElement('div');
  textDiv.className = 'task-text';
  textDiv.textContent = value;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.innerHTML = `<img src="icons/trashcan.png" alt="delete">`;

  li.appendChild(textDiv);
  li.appendChild(deleteBtn);

  // delete handler
  deleteBtn.addEventListener('click', () => {
    // remove from array (removes all duplicates with same text)
    tasks = tasks.filter(task => task !== value);
    // remove from DOM
    li.remove();
    // persist
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  return li;
}

/* ---------- Add task logic ---------- */
function addTask() {
  const value = taskInput.value.trim();
  if (!value) {
    alert('Empty Field, Try again');
    return;
  }

  // duplicate check (case-insensitive) using tasks array
  if (tasks.some(t => t.trim().toLowerCase() === value.toLowerCase())) {
    alert('Task Already Exists');
    return;
  }

  // create element + append
  const li = createTaskItem(value);
  taskList.appendChild(li);

  // save
  tasks.push(value);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // clear input
  taskInput.value = '';
  taskInput.focus();
}

/* allow Enter key to add */
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
addTaskButton.addEventListener('click', addTask);

/* ---------- Load tasks from storage ---------- */
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (!saved) return;
  try {
    tasks = JSON.parse(saved) || [];
  } catch (err) {
    tasks = [];
  }

  for (const value of tasks) {
    const li = createTaskItem(value);
    taskList.appendChild(li);
  }
}

/* ---------- Optional: simple live-search (if you have an input#search) ---------- */
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    for (const li of taskList.children) {
      const text = li.querySelector('.task-text')?.textContent.trim().toLowerCase() || '';
      li.style.display = text.includes(q) ? '' : 'none';
    }
  });
}

/* ---------- Init ---------- */
loadTasks();
