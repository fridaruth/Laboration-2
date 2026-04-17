import { TodoList } from "./models/TodoList";

const myTodoList = new TodoList();

// formulärhantering
const form = document.getElementById("todo-form") as HTMLFormElement;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskInput = document.getElementById("task") as HTMLInputElement;
  const priorityInput = document.getElementById("priority") as HTMLSelectElement;
  const errorP = document.getElementById("error-message") as HTMLParagraphElement;

  const success = myTodoList.addTodo(taskInput.value, parseInt(priorityInput.value));

  if (success) {
    errorP.style.display = "none";
    renderTodos();
    taskInput.value = "";
  } else {
    errorP.innerText = "Felaktig inmatning! Kontrollera att du skrivit en uppgift och valt prioritet.";
    errorP.style.display = "block";
    errorP.style.color = "#842a3b";
  }
});

function renderTodos() {
  const listContainer = document.getElementById("todo-list")!;
  const todos = myTodoList.getTodos();

  listContainer.innerHTML = "";

  if (todos.length === 0) {
    listContainer.innerHTML = '<p class="empty-message">Listan är tom... än så länge!</p>';
    return;
  }

  // loopa igenom todos till HTML
  todos.forEach((todo, index) => {
    const todoArticle = document.createElement("article");

    // lägg till klasser för styling
    todoArticle.className = "todo-item";
    if (todo.completed) {
      todoArticle.classList.add("completed");
    }

    // skapa innehåll
    todoArticle.innerHTML = `
    <div class="todo-list">
    <span class="priority-label">Prio: ${todo.priority}</span>
    <h3>${todo.task}</h3>
    </div>
    `;

    // skapa klar-knapp
    if(!todo.completed) {
      const doneBtn = document.createElement("button");
      doneBtn.innerText = "Färdig";
      doneBtn.className = "done-btn";

      doneBtn.addEventListener("click", () => {
        myTodoList.markTodoCompleted(index);
        renderTodos();
      });

      todoArticle.appendChild(doneBtn);
    } else {
      const status = document.createElement("span");
      status.innerText = "✅";
      status.className = "status-check";
      todoArticle.appendChild(status);
    }

    listContainer.appendChild(todoArticle);
  })
}

renderTodos();