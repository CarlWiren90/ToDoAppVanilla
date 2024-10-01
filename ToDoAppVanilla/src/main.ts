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


const renderTaskList = () => {
    for (let i:number = 0 ; i < tasks.length; i ++) {
        //Creates task container
        let taskContainer: any = document.createElement("div");
        taskContainer.id = 'task-container';
        todoContainer.appendChild(taskContainer);

        let taskItem: any = document.createElement('span');
        taskItem.id = 'task-item';
        let taskName = tasks[i].taskName;
        taskContainer.appendChild(taskItem); 
        taskItem.innerHTML = taskName;
        
    }
}


renderTaskList();