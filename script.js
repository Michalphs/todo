const btnAddTask = document.querySelector('.action-task-add');
const btnDeleteTask = document.querySelector('.action-task-delete');
const btnMarkToDo = document.querySelector('.action-task-todo');
const btnMarkDone = document.querySelector('.action-task-done');
const btnProjectName = document.querySelector('.project-name-edit');
///
const leftPanelName = document.querySelector('.name');
const headingName = document.querySelector('.list-name-title');

function getRemainingTodosCount() {
    const remaining = document.querySelector('.remaining');
    const listEl = document.querySelectorAll('.tasks-list-item');
    remaining.textContent = listEl.length;
}
getRemainingTodosCount();

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
    headingName.textContent = '';
    headingName.appendChild(newInput);
    
    return newInput;
}

function saveNewName() {
    const input = document.querySelector('#project-name-input');
    if (input.value !== '') {
       
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
        getRemainingTodosCount();
        taskName.style.borderColor = '#f2f2f2';
    } else {
        taskName.style.borderColor = '#f3565d';
    }
    taskName.value = '';
}

function deleteChecked() {
    const checkInputs = document.querySelectorAll('.check-status:checked');
    checkInputs.forEach(el => {
        el.parentNode.remove();
    });
    getRemainingTodosCount();
}

function maskAsToDo() {
    const checkInputs = document.querySelectorAll('.check-status:checked');
    checkInputs.forEach(el => {
        const elem = el.parentNode;
        const status = elem.querySelector('.status');
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
        const status = elem.querySelector('.status');
        status.textContent = "Done";
        status.classList.add('done');
    });
}

btnAddTask.addEventListener('click', addTask);
btnDeleteTask.addEventListener('click', deleteChecked);
btnMarkToDo.addEventListener('click', maskAsToDo);
btnMarkDone.addEventListener('click', maskAsDone);
btnProjectName.addEventListener('click', createNewNameProject);