import type { Todo } from "./Todo";

export class TodoList {
    private todos: Todo[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    addTodo(task: string, priority: number): boolean {
        // validering
        if (task.trim() === "" || priority < 1 || priority > 3) {
            return false;
        }

        const newTodo: Todo = {
            task: task,
            completed: false,
            priority: priority
        };

        this.todos.unshift(newTodo);
        this.saveToLocalStorage();
        return true;
    }

    markTodoCompleted(todoIndex: number): void {
        if (this.todos[todoIndex]) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    }

    deleteTodo(todoIndex: number): void {
        // ta bort element
        this.todos.splice(todoIndex, 1);

        // spara uppdaterad lista
        this.saveToLocalStorage();
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    loadFromLocalStorage(): void {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            this.todos = JSON.parse(storedTodos);
        }
    }
}