import './style.css'


//Task list
const tasks:Task[] = [];
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



const todoContainer: HTMLElement | Node | null = document.getElementById("todo-container");
let taskItem: HTMLElement = document.createElement('span');
let taskContainer: HTMLElement = document.createElement("div");
let taskInput: Node | HTMLElement | string = document.createElement('input');
let taskInputValue: Node | HTMLElement | string;
let taskEditInputValue: Node | HTMLElement | string;
const addTaskButton: HTMLElement | null | Node = document.getElementById('addTaskButton');
const saveTaskButton: HTMLElement | null = document.getElementById('saveTaskButton');


const renderTaskList = () => {
    todoContainer.innerHTML = '';
    for (let i:number = 0 ; i < tasks.length; i ++) {
        //Creates task container
        taskContainer = document.createElement("div");
        taskContainer.className = 'task-container';
        taskContainer.id = 'task-container' + tasks.indexOf(tasks[i]);
        todoContainer.appendChild(taskContainer);

        taskItem = document.createElement('span');
        taskItem.className = 'task-item';
        let taskName = tasks[i].taskName;
        taskContainer.appendChild(taskItem); 
        taskItem.innerHTML = taskName; 
        console.log(tasks[i].taskID)
        console.log(tasks);
        renderTaskButtons(tasks[i].taskID);        
    }
}

const renderTaskButtons = (taskItemID: number) => {
    let buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    taskContainer.appendChild(buttonsContainer);
    taskItem.onclick = () => editTask(taskItemID);

    let deleteButton = document.createElement('input');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'image';
    deleteButton.src = './cross.png';
    deleteButton.onclick = () => deleteTask(taskItemID);
    buttonsContainer.appendChild(deleteButton);

    let checkmarkButton = document.createElement('input');
    checkmarkButton.className = 'checkmark-button';
    checkmarkButton.type = 'image';
    checkmarkButton.src = './checkmark.png';
    checkmarkButton.onclick = () => completeTask(taskItemID);
    buttonsContainer.appendChild(checkmarkButton);
}

const completeTask = (taskItemID: number) => {
for (let i: number = 0 ; i < tasks.length ; i ++ ) {
        if (tasks[i].taskID === taskItemID) {
            let indexCompletedTask = tasks.indexOf(tasks[i]);
            tasks.splice(indexCompletedTask, 1);
/*             console.log(`deleted ${taskItemID}`);
 */            console.log(tasks);
            taskIDNumber--;
            tasksCompleted++;
        }
    } 
    updateTasksCompleted();
    renderTaskList();
}

const editTask = (taskItemID: number) => {
    for (let i:number = 0 ; i < tasks.length ; i ++) {
        if (tasks[i].taskID === taskItemID) {
            let taskContainerToBeRemoved = document.getElementById('task-container' + tasks.indexOf(tasks[i]));
            let editTaskContainer = document.createElement('div');
            editTaskContainer.id ='editTaskContainer';
            taskContainerToBeRemoved.replaceWith(editTaskContainer);

            let saveEditButton = document.createElement('button');
            saveEditButton.id = 'saveEditButton';
            saveEditButton.innerText = 'Save!';
            editTaskContainer.appendChild(saveEditButton);
            
            let newEditInputForm = document.createElement('input');
            newEditInputForm.id = 'newEditInputForm';
            newEditInputForm.value = tasks[i].taskName;
            editTaskContainer.appendChild(newEditInputForm);

            saveEditButton.addEventListener('click', () => {
                console.log('save clicked');               
                let newEditedTask = new Task(newEditInputForm.value, tasks.indexOf(tasks[i]));
                let taskToBeEditedIndex = tasks.indexOf(tasks[i]);
                tasks.splice(taskToBeEditedIndex, 1);
                tasks.splice(taskToBeEditedIndex, 0, newEditedTask);
                editTaskContainer.removeChild(newEditInputForm);
                todoContainer?.removeChild(editTaskContainer);
                renderTaskList();
                console.log(tasks);
            })
        }
    }
};

const deleteTask = (taskItemID: number) => {
    for (let i: number = 0 ; i < tasks.length ; i++ ) {
        if(tasks[i].taskID === taskItemID) {
            let indexDeletedTask = tasks.indexOf(tasks[i]);
            tasks.splice(indexDeletedTask, 1);
            taskIDNumber--;
        }
        renderTaskList();
    }
}

const updateTasksCompleted = () => {
    document.getElementById('tasks-completed-counter').innerHTML = 'Total tasks completed: ' + tasksCompleted;   
}


todoContainer.addEventListener('click', () => {
    taskItem.addEventListener('click',  () => {
        let taskToBeEdited: HTMLElement | null = document. getElementById('task-item');
    })
});  

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

    taskInputValue = taskInput.value;
    if (taskInputValue === '' || null ) {
        taskInput.placeholder = "Enter task here!";
    }
    else {
        let newTask:any = new Task(taskInputValue, taskIDNumber);
        taskIDNumber++;
        tasks.push(newTask);
        todoContainer.removeChild(taskInput);
        renderTaskList();
        taskInput.value = '';
        saveTaskButton.style.display = 'none';
        addTaskButton.style.display = 'block'; 
    }
});




renderTaskList();
updateTasksCompleted();
saveTaskButton.style.display = 'none';

