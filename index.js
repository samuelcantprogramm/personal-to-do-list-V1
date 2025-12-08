const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('TaskList');

let tasks = []
addTaskButton.addEventListener('click', () => {

  const li = document.createElement('li');
  const value = taskInput.value.trim();

  if (value === "") {
    alert("Empty Field, Try again");
    return;
  }

  let exists = false;
  for (let item of taskList.children){
    if (item.textContent.trim().toLowerCase() === value.toLowerCase()){
        exists = true;
        break;
    }
  }

  if (exists === true){
    alert("Task Already Exists")
    return;
  }
  li.textContent = value;
  taskList.appendChild(li);
  tasks.push(value)
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  
  const deleteBtn =  document.createElement('button');
  deleteBtn.innerHTML = `<img src="icons/trashcan.png" alt="delete" />`;
  li.appendChild(deleteBtn)
  deleteBtn.addEventListener("click", () => {
    const valueToDelete = li.firstChild.textContent.trim();
    tasks = tasks.filter(task => task !== valueToDelete)
    li.remove();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

});

function loadTasks(){
    const saved = localStorage.getItem("tasks")
    if (!saved) {
        return
    }
    
    tasks = JSON.parse(saved)

    for (let value of tasks){
        const li = document.createElement("li")
        li.textContent =  value;
        taskList.appendChild(li);
        const deleteBtn =  document.createElement('button');
        deleteBtn.innerHTML = `<img src="icons/trashcan.png" alt="delete" />`;
        li.appendChild(deleteBtn)
        deleteBtn.addEventListener("click", () => {
            const valueToDelete = li.firstChild.textContent.trim();
            tasks = tasks.filter(task => task !== valueToDelete)
            li.remove();
            localStorage.setItem("tasks", JSON.stringify(tasks))
        });

    }
}

loadTasks();