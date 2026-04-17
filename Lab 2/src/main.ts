import { TodoList } from "./models/TodoList";
import './css/style.css';

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
    todoArticle.className = `todo-item priority-${todo.priority}`;
    if (todo.completed) {
      todoArticle.classList.add("completed");
    }

    // skapa innehåll
    todoArticle.innerHTML = `
    <div class="todo-info">
    <span class="priority-label">Prio: ${todo.priority}</span>
    <h3>${todo.task}</h3>
    </div>
    `;

    // skapa behållare för knappar
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // skapa klar-knapp
    if (!todo.completed) {
      const doneBtn = document.createElement("button");
      doneBtn.innerText = "Färdig";
      doneBtn.className = "done-btn";

      doneBtn.addEventListener("click", () => {
        myTodoList.markTodoCompleted(index);
        renderTodos();
      });

      buttonGroup.appendChild(doneBtn);
    } else {
      const status = document.createElement("span");
      status.innerText = "✅";
      status.className = "status-check";
      buttonGroup.appendChild(status);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
      if (confirm("Ta bort uppgift?")) {
        myTodoList.deleteTodo(index);
        renderTodos();
      }
    });

    buttonGroup.appendChild(deleteBtn);

    todoArticle.appendChild(buttonGroup);

    listContainer.appendChild(todoArticle);
  });
}

renderTodos();