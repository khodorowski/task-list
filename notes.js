//DEFINE UI VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')

// LOAD ALL EVENT LISTENERS
loadEventListeners();

//load all event listenera
function loadEventListeners(){
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks)
    //filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

// CREATE ADD TASK
function addTask(e){
    if (taskInput.value === ''){
        alert('Please Enter a Task');
    }
    //create li element
    const li = document.createElement('li');
    //add a class to the element
    li.className = 'collection-item'
    //create text node and append to the list
    li.appendChild(document.createTextNode(taskInput.value));
    //create a new link element
    const link = document.createElement('a');
    //add a class to the link element
    link.className = 'delete-item secondary-content'; //if you want something to the right in materialize it has to have secondary-content
    //add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append the link to the list
    li.appendChild(link);

    //append the li to the ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear the input
    taskInput.value = '';

    e.preventDefault();
}

//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();
        }
    }
}
//make the button functional to clear tasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}
//filter tasks. this allows a specific search to be done in the list
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.dysplay = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}