var count = 0; 
/* Selectors: Selectors are used to "find" (select) HTML elements based on their tag 
name, id, classes, types, attributes, values of attributes and much more. */
const todoInput = document.querySelector('.todo-input');
const todoButton= document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoClear = document.querySelector('.clear-all');



/* Event Listeners: An event listener is a procedure in JavaScript that waits for an 
event to occur. */
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", listClick);
todoClear.addEventListener("click", clearAll)


// Functions
/*
    addTodo: Function that handles the form that submits a new task to the todo list
*/
function addTodo(event) {
    /*
        using JS to create the html structure of:
        <div class="todo">
            <li class="todo-item">Input Text</li>
            <button class="complete-button"><i class="fas fa-check"></i></button>
            <button class="delete-button"><i class="fas fa-trash"></i></button>
        </div>
    */

    // prevent form from submitting
    event.preventDefault();

    if (todoInput.value != '') {
        // Creating the div for each individual todo task
        const todoDiv = document.createElement("div"); // Creating the div html tag
        todoDiv.classList.add("todo");      // class attribute to the "todoDiv" div

        // Creating the li for each individual todo task
        const newTodo = document.createElement("li"); // Creating the li html tag
        newTodo.innerText = todoInput.value;          // Grabbing text from form input and putting into li innerText
        newTodo.classList.add("todo-item"); // class attribute to the "todoDiv" div
        todoDiv.appendChild(newTodo);       // adding the li inside of the "todo" div

        // Creating the buttons inside out todo div
        // Complete Button (ALTERNATE WAY TO ADD TO "button" TAG USING innerHTML)
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-button");
        todoDiv.appendChild(completedButton);

        // Delete Button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);

        // Append to list (Adding our new task to the todo list!)
        todoList.appendChild(todoDiv);

        // Clearing the form input so a new todo task can be added.
        todoInput.value = "";
        count++;
        document.getElementById("todo-count").innerText = `${count}`;
    }
}


/*
    listClick: Function that handles pressing on the different elements of the todo
    tasks. This is done by having the option of click the delete button, complete
    button, or clicking on the actual task that was added.
*/
function listClick(event) {
    const item = event.target; // item is whatever was clicked

    // Delete todo task
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement; // item grabs the button so we grab the buttons parent to delete the whole todo
        todo.remove(); // removing the todo from the todo list (like removing from array)
        
        // Updating the total amount of tasks to do after one had been deleted
        if (count > 0 && todo.classList.length != 2) {
            count--;
            document.getElementById("todo-count").innerText = `${count}`;
        }
    }

    // Complete todo task
    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;

        // toggle() method supports adding and removing CSS classes whether they
        // exist or not in your array with shorter lines of code.
        todo.classList.toggle("completed"); // adding "comeplete" class

        /* Updating the total amount of tasks to do after one had been checked
           if the item in the todo list has the additional attribute of completed it
           will decrease the amount of tasks to do. If the item in the todo list has 
           only one attribute, in this case "todo", it will increase the amount of 
           tasks to do.
        */
        if(todo.classList.length === 2) {
            count--;
            document.getElementById("todo-count").innerText = `${count}`;
        } else {    // if the has the attribute of completed it will increase the amount of tasks to do
            count++;
            document.getElementById("todo-count").innerText = `${count}`;
        }
    }
}

function clearAll(event) {
    count = 0;
    document.getElementById("todo-count").innerText = `${count}`;
    todoList.innerHTML = ``;
}