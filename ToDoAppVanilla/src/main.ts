import './style.css'


//Task list
const tasks:any = [];
let taskIDNumber = 0;


class Task {
    taskName: string;
    taskID: number;
    constructor(taskName:string, taskID:number) {
        this.taskName = taskName;
        this.taskID = taskID;
    }
}



const todoContainer: any = document.getElementById("todo-container");
let taskItem: any = document.createElement('span');
let taskContainer: any = document.createElement("div");
let taskInput = document.createElement('input');
let taskInputValue;
const addTaskButton = document.getElementById('addTaskButton');
const saveTaskButton = document.getElementById('saveTaskButton');





const renderTaskList = () => {
    todoContainer.innerHTML = '';
    for (let i:number = 0 ; i < tasks.length; i ++) {
        //Creates task container
        taskContainer = document.createElement("div");
        taskContainer.className = 'task-container';
        todoContainer.appendChild(taskContainer);

        taskItem = document.createElement('span');
        taskItem.className = 'task-item';
        let taskName = tasks[i].taskName;
        taskContainer.appendChild(taskItem); 
        taskItem.innerHTML = taskName;     

        renderTaskButtons();
    }
}

const renderTaskButtons = () => {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    taskContainer.appendChild(buttonsContainer);

    let deleteButton = document.createElement('input');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'image';
    deleteButton.src = './cross.png';
    buttonsContainer.appendChild(deleteButton);

    let checkmarkButton = document.createElement('input');
    checkmarkButton.className = 'checkmark-button';
    checkmarkButton.type = 'image';
    checkmarkButton.src = './checkmark.png';
    buttonsContainer.appendChild(checkmarkButton);
}

const deleteTask = () => {

}



addTaskButton.addEventListener('click', function () {
    if (tasks.length < 6) {
        addTaskButton.style.display = 'none';
        taskInput.className = 'task-input';
        todoContainer.appendChild(taskInput);
        saveTaskButton.style.display = 'block';
    }
});


saveTaskButton.addEventListener('click', function () {
    saveTaskButton.style.display = 'none';
    addTaskButton.style.display = 'block';
    let taskInputValue = taskInput.value;
    let newTask:any = new Task(taskInputValue, taskIDNumber);
    taskIDNumber++;
    tasks.push(newTask);
    todoContainer.removeChild(taskInput);
    renderTaskList();
    console.log(tasks);
    console.log(taskInputValue);
    taskInput.value = '';
});


renderTaskList();
saveTaskButton.style.display = 'none';

