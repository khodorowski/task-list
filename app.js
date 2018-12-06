const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
//load all event listenera
function loadEventListeners(){
    //DOM load EVENT
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks)
    //filter tasks event
    filter.addEventListener('keyup', filterTasks)
    //mouse over
    
//get task from LS
function getTasks (){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){ 
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-circle-o"></i>';
        // Append the link to li
        li.appendChild(link);
    
        // Append li to ul
        taskList.appendChild(li);
      });
    }

//ADD TASK
function addTask(e){
    if (taskInput.value === ''){
        alert('Please Enter a Task');
    }
    const li = document.createElement('li');
    
    li.className = 'collection-item'
    
    li.appendChild(document.createTextNode(taskInput.value));
    
    const link = document.createElement('a');
    
    link.className = 'delete-item secondary-content';
    
    link.innerHTML = '<i class="fa fa-circle-o"></i>'

    li.appendChild(link);
    
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);
    //CLEAR INPUT
    taskInput.value = '';

    e.preventDefault();
}
//local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        //remove from ls
        removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
    }
}
//create a function to remove from local server
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if (taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//make the button functional to clear tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //clear from local storage
    clearTasksFromLocalStorage();
}
//clear tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


//filter tasks. this allows a specific search to be done in the list
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task)
    {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.dysplay = 'block';
        } else {
            task.style.display = 'none';
        }
        task.value = '';
  });
}}
