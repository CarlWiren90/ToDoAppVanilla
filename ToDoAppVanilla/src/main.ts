import './style.css'


//Task list
const tasks:any = [
    {
        id: 0,
        taskName:'Laundry',
    } ,

    {
        id: 1,
        taskName:'Shopping',
    }
];


const todoContainer: any = document.getElementById("todo-container");
let taskItem: any = document.createElement('span');
let taskContainer: any = document.createElement("div");



const renderTaskList = () => {
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


renderTaskList();
