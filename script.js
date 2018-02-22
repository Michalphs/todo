const btnAddTask = document.querySelector('.action-task-add');
const btnDeleteTask = document.querySelector('.action-task-delete');
const btnMarkToDo = document.querySelector('.action-task-todo');
const btnMarkDone = document.querySelector('.action-task-done');
const btnProjectName = document.querySelector('.project-name-edit');
const btnProjectDelete = document.querySelector('.project-delete');
const btnSaveTodo = document.querySelector('.action-task-save');
const btnDeleteTodo = document.querySelector('.action-task-todo-delete');
const btnReadTodo = document.querySelector('.action-task-read');
///
const leftPanelName = document.querySelector('.name');
const headingName = document.querySelector('.list-name-title');

function remainingToDo() {
    const remaining = document.querySelector('.remaining');
    const listEl = document.querySelectorAll('.tasks-list-item');
    remaining.textContent = listEl.length;
}
remainingToDo();

function createButton() {
    const newBtn = document.createElement('button');
    newBtn.classList.add("button");
    newBtn.classList.add("save-new-name");
    newBtn.textContent = "Save";
    headingName.appendChild(newBtn);
    return newBtn;
}

function createInput() {
    const newInput = document.createElement('input');
    newInput.id = "project-name-input";
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Enter your new name...');
    headingName.appendChild(newInput);
    return newInput;
}

function saveNewName() {

    const input = document.querySelector('#project-name-input');
    

    if(input.value !== '') {
        headingName.removeChild.firstElementChild;
        headingName.textContent = input.value;
        leftPanelName.textContent = input.value;
        input.style.borderColor = '#f2f2f2';
    } else {
        input.style.borderColor = '#f3565d';
    }
}

function createNewNameProject() {
    const btn = document.querySelectorAll('.save-new-name');
    if (btn.length < 1) {
        const input = createInput();
        const button = createButton();
        button.addEventListener('click', saveNewName);
    }

}

function deleteProject() {
    const panel = document.querySelector('#main-content');
    panel.parentNode.removeChild(panel);
}

function addTask() {
    const tasksList = document.querySelector('#tasks-list');
    const taskName = document.querySelector('#task-name');
    const createTask = document.createElement('li');

    createTask.classList.add('tasks-list-item');
    createTask.innerHTML = '<div class="status">To Do</div>' +
        '<input class="check-status" type="checkbox" />' +
        '<span class="task-text">' + taskName.value + '</span>';

    if (taskName.value !== "") {
        tasksList.appendChild(createTask);
        remainingToDo();
        taskName.style.borderColor = '#f2f2f2';
    } else {
        taskName.style.borderColor = '#f3565d';
    }
    taskName.value = '';
}

function deleteChecked() {
    const checkInputs = document.querySelectorAll('.check-status:checked');
    checkInputs.forEach(el => {

        const elem = el.parentNode;
        elem.parentNode.removeChild(elem);
    });
    remainingToDo();
}

function maskAsToDo() {
    const checkInputs = document.querySelectorAll('.check-status:checked');

    checkInputs.forEach(el => {

        const elem = el.parentNode;
        const status = elem.firstElementChild;

        status.textContent = 'To do';
        if (status.classList.contains('done')) {
            status.classList.remove('done');
        }
    });
}

function maskAsDone() {
    const checkInputs = document.querySelectorAll(".check-status:checked");
    checkInputs.forEach(el => {

        const elem = el.parentNode;
        const status = elem.firstElementChild;

        status.textContent = "Done";
        if (!status.classList.contains('done')) {
            status.classList.add('done');
        }
    });
}

function saveTodoStorage() {
    const todoName = document.querySelector('.list-name-title').textContent;
    const todoRequest = document.querySelectorAll('.task-text');
    const todoRequestStatuses = document.querySelectorAll('.status');
    const todoRequestStatus = Array.from(todoRequestStatuses);
    const todoRequestText = Array.from(todoRequest);
    const myObj = {
        todoName: todoName,
    }

    todoRequestStatus.forEach(element => {
        const todoRequestsStatusText = todoRequestStatus.map(element => element.textContent);

        myObj.todoRequestStatusText = todoRequestsStatusText;
    });
   
    todoRequestText.forEach(element => {
        const todoRequestsTexts = todoRequestText.map(element => element.textContent);
        myObj.todoRequestTexts = todoRequestsTexts;
    });
    const obStr = JSON.stringify(myObj);
    localStorage.setItem('MyTodo', obStr);
}
function delteTodoStorage() {
    localStorage.clear();
}
function readTodoStorage() {
    if(localStorage.getItem('MyTodo') === null) {
        alert('First save todo ;)');
        return;
    } 
    const storage = localStorage.getItem('MyTodo');
    const myObj  = JSON.parse(storage);
    const todoName = document.querySelector('.list-name-title');
    todoName.textContent = myObj.todoName;
    leftPanelName.textContent = myObj.todoName;

    const addTask = addTaskTodoStorage(myObj);
}

function addTaskTodoStorage(e) {
    const tasksList = document.querySelector('#tasks-list');
    const todoRequestTexts = e.todoRequestTexts;
    const todoRequestStatusText = e.todoRequestStatusText;

    todoRequestTexts.forEach(element => {
        const createLi = document.createElement('li');
        const createSpan = document.createElement('span');
        const createInput = document.createElement('input');
        const createStatus = document.createElement('div');
        
        createLi.classList.add('tasks-list-item');

        createInput.classList.add('check-status');
        createInput.setAttribute('type', 'checkbox');

        createSpan.classList.add('task-text');
        createSpan.textContent = element;


        tasksList.appendChild(createLi);
        createLi.appendChild(createInput);
        createLi.appendChild(createSpan);
        remainingToDo();
        todoRequestStatusText.forEach(el => {
            createStatus.classList.add('status');
            if(el === 'Done') {
                createStatus.classList.add('done');
                createStatus.textContent = el;
            } else {
                createStatus.textContent = el;
            }
            
            createLi.appendChild(createStatus);
        });
    });
}

btnAddTask.addEventListener('click', addTask);
btnDeleteTask.addEventListener('click', deleteChecked);
btnMarkToDo.addEventListener('click', maskAsToDo);
btnMarkDone.addEventListener('click', maskAsDone);
btnProjectName.addEventListener('click', createNewNameProject);
btnProjectDelete.addEventListener('click', deleteProject);
btnSaveTodo.addEventListener('click', saveTodoStorage);
btnDeleteTodo.addEventListener('click', delteTodoStorage);
btnReadTodo.addEventListener('click', readTodoStorage);