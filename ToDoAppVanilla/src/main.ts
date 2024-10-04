import './style.css'


//Task list
const tasks:any = [];
let taskIDNumber = 0;
let tasksCompleted = 0;


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
const addTaskButton: HTMLElement = document.getElementById('addTaskButton');
const saveTaskButton: HTMLElement = document.getElementById('saveTaskButton');









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
        console.log(tasks[i].taskID)
        renderTaskButtons(tasks[i].taskID);
        
    }
}

const renderTaskButtons = (taskItemID: string) => {
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
    checkmarkButton.onclick = () => completeTask(taskItemID);
    buttonsContainer.appendChild(checkmarkButton);
}

const completeTask = (taskItemID: string) => {
for (let i: number = 0 ; i < tasks.length ; i ++ ) {
        if (tasks[i].taskID === taskItemID) {
            let indexCompletedTask = tasks.indexOf(tasks[i]);
            tasks.splice(indexCompletedTask, 1);
            console.log(`deleted ${taskItemID}`);
            console.log(tasks);
            taskIDNumber--;
            tasksCompleted++;
        }
    } 
    updateTasksCompleted();
    renderTaskList();

}

const updateTasksCompleted = () => {
    document.getElementById('tasks-completed-counter').innerHTML = 'Total tasks completed: ' + tasksCompleted;   
}


addTaskButton.addEventListener('click', () => {
    if (tasks.length < 6) {
        addTaskButton.style.display = 'none';
        taskInput.className = 'task-input';
        taskInput.id = 'task-input-id';
        todoContainer.appendChild(taskInput);
        saveTaskButton.style.display = 'block';
    }
});


saveTaskButton.addEventListener('click', () => {
    saveTaskButton.style.display = 'none';
    addTaskButton.style.display = 'block';
    
    let taskInputValue = taskInput.value;


        let newTask:any = new Task(taskInputValue, taskIDNumber);
        taskIDNumber++;
        tasks.push(newTask);
        todoContainer.removeChild(taskInput);
        renderTaskList();
        taskInput.value = '';

});


renderTaskList();
updateTasksCompleted();
saveTaskButton.style.display = 'none';

