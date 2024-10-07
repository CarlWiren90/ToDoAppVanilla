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



const todoContainer: HTMLElement | null = document.getElementById("todo-container");
let taskItem: HTMLElement = document.createElement('span');
let taskContainer: HTMLElement = document.createElement("div");
let taskInput: HTMLInputElement = document.createElement('input');
let taskInputValue: string;
const addTaskButton = document.querySelector<HTMLButtonElement>('#addTaskButton');
const saveTaskButton = document.querySelector<HTMLButtonElement>('#saveTaskButton');

const renderTaskList = ():void => {
    if (todoContainer) {
        todoContainer.innerHTML = '';
        for (let i:number = 0 ; i < tasks.length; i ++) {
            //Creates task container
            taskContainer = document.createElement("div") as HTMLElement;
            taskContainer.className = 'task-container';
            taskContainer.id = 'task-container' + tasks.indexOf(tasks[i]);
            todoContainer.appendChild(taskContainer);
    
            taskItem = document.createElement('span') as HTMLElement;
            taskItem.className = 'task-item';
            let taskName = tasks[i].taskName;
            taskContainer.appendChild(taskItem); 
            taskItem.innerHTML = taskName; 
            console.log(tasks[i].taskID)
            console.log(tasks);
            renderTaskButtons(tasks[i].taskID);        
        }
    }
}

const renderTaskButtons = (taskItemID: number) => {
    let buttonsContainer = document.createElement('div') as HTMLElement;
    buttonsContainer.className = 'buttons-container';
    taskContainer.appendChild(buttonsContainer);
    taskItem.onclick = () => editTask(taskItemID);

    let deleteButton = document.createElement('input') as HTMLInputElement;
    deleteButton.className = 'delete-button';
    deleteButton.type = 'image';
    deleteButton.src = './cross.png';
    deleteButton.onclick = () => deleteTask(taskItemID);
    buttonsContainer.appendChild(deleteButton);

    let checkmarkButton = document.createElement('input') as HTMLInputElement;
    checkmarkButton.className = 'checkmark-button';
    checkmarkButton.type = 'image';
    checkmarkButton.src = './checkmark.png';
    checkmarkButton.onclick = () => completeTask(taskItemID);
    ;
    buttonsContainer.appendChild(checkmarkButton);
}

const completeTask = (taskItemID: number): void => {
    for (let i: number = 0 ; i < tasks.length ; i ++ ) {
        if (tasks[i].taskID === taskItemID) {

            completedTaskTransition(i);

            setTimeout(() => {
                let indexCompletedTask = i;
                tasks.splice(indexCompletedTask, 1);
                console.log(tasks);
                taskIDNumber--;
                tasksCompleted++;
                updateTasksCompleted();
                renderTaskList();
            }, 800)
        }
    } 
}

const editTask = (taskItemID: number): void => {
    if (addTaskButton) {
        addTaskButton.style.display = 'none'
    }
    for (let i:number = 0 ; i < tasks.length ; i ++) {
        if (tasks[i].taskID === taskItemID) {
            let taskContainerToBeRemoved = document.getElementById('task-container' + i);
            let editTaskContainer = document.createElement('div') as HTMLElement;
            editTaskContainer.id ='editTaskContainer';

            if (taskContainerToBeRemoved) {
                taskContainerToBeRemoved.replaceWith(editTaskContainer);

                let saveEditButton = document.createElement('button') as HTMLButtonElement;
                saveEditButton.id = 'saveEditButton';
                saveEditButton.innerText = 'Save!';
                editTaskContainer.appendChild(saveEditButton);
                
                let newEditInputForm = document.createElement('input') as HTMLInputElement;
                newEditInputForm.id = 'newEditInputForm';
                newEditInputForm.value = tasks[i].taskName;
                editTaskContainer.appendChild(newEditInputForm);
    
                saveEditButton.addEventListener('click', () => {
                    console.log('save clicked');               
                    let newEditedTask: Task = new Task(newEditInputForm.value, i);
                    let taskToBeEditedIndex = i;
                    tasks.splice(taskToBeEditedIndex, 1);
                    tasks.splice(taskToBeEditedIndex, 0, newEditedTask);
                    editTaskContainer.removeChild(newEditInputForm);
                    todoContainer?.removeChild(editTaskContainer);
                    renderTaskList();
                    console.log(tasks);
                    
                    if (addTaskButton) {
                        addTaskButton.style.display = 'block'
                    }
                })
            }
            else {
                console.log(`Task container with ID 'task-container${i}' is not found`);
            }
        }
    }

};

const deleteTask = (taskItemID: number): void => {
    for (let i: number = 0 ; i < tasks.length ; i++ ) {
        if(tasks[i].taskID === taskItemID) {
            let indexDeletedTask = i;
            tasks.splice(indexDeletedTask, 1);
            taskIDNumber--;
        }
        renderTaskList();
    }
}

const updateTasksCompleted = (): void => {
    document.getElementById('tasks-completed-counter')!.innerHTML = 'Total tasks completed: ' + tasksCompleted;   
}


todoContainer?.addEventListener('click', () => {
    taskItem.addEventListener('click',  () => {
    })
});  

addTaskButton?.addEventListener('click', () => {
    if (tasks.length < 6) {
        addTaskButton.style.display = 'none';
        taskInput.className = 'task-input';
        taskInput.id = 'task-input-id';
        todoContainer?.appendChild(taskInput);

        if(saveTaskButton) {
            saveTaskButton.style.display = 'block';

        }
    }
});


saveTaskButton?.addEventListener('click', () => {

    taskInputValue = taskInput.value;
    if (taskInputValue === '' || null ) {
        taskInput.placeholder = "Enter task here!";
    }
    else {
        const newTask:Task = new Task(taskInputValue, taskIDNumber);
        taskIDNumber++;
        tasks.push(newTask);
        todoContainer?.removeChild(taskInput);
        renderTaskList();
        taskInput.value = '';
        saveTaskButton.style.display = 'none';

        if (addTaskButton) {
            addTaskButton.style.display = 'block'; 
        }
    }
});



const completedTaskTransition = (containerID: number): void => {
    const taskCompletedContainer = document.querySelector('#task-container' + containerID);
    taskCompletedContainer?.classList.toggle('active');
}

renderTaskList();
updateTasksCompleted();
if (saveTaskButton) {
    saveTaskButton.style.display = 'none';
}

