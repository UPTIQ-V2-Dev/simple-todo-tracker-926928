import { Todo, CreateTodoInput, UpdateTodoInput, TodoStats } from '../types/todo';
import { mockTodos } from '../data/todos';

const STORAGE_KEY = 'todos';

// Generate unique ID for new todos
const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get todos from localStorage or return mock data
export const getTodos = async (): Promise<Todo[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        return Promise.resolve(mockTodos);
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        // If no todos in localStorage, initialize with empty array
        return [];
    } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
        return [];
    }
};

// Add a new todo
export const addTodo = async (input: CreateTodoInput): Promise<Todo> => {
    const newTodo: Todo = {
        id: generateId(),
        title: input.title,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        return Promise.resolve(newTodo);
    }

    try {
        const todos = await getTodos();
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
        return newTodo;
    } catch (error) {
        console.error('Failed to add todo:', error);
        throw new Error('Failed to add todo');
    }
};

// Update an existing todo
export const updateTodo = async (id: string, input: UpdateTodoInput): Promise<Todo> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        const mockTodo = mockTodos.find(t => t.id === id);
        if (!mockTodo) {
            throw new Error('Todo not found');
        }
        return Promise.resolve({
            ...mockTodo,
            ...input,
            updatedAt: new Date().toISOString()
        });
    }

    try {
        const todos = await getTodos();
        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            throw new Error('Todo not found');
        }

        const updatedTodo: Todo = {
            ...todos[todoIndex],
            ...input,
            updatedAt: new Date().toISOString()
        };

        todos[todoIndex] = updatedTodo;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

        return updatedTodo;
    } catch (error) {
        console.error('Failed to update todo:', error);
        throw new Error('Failed to update todo');
    }
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        return Promise.resolve();
    }

    try {
        const todos = await getTodos();
        const filteredTodos = todos.filter(todo => todo.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTodos));
    } catch (error) {
        console.error('Failed to delete todo:', error);
        throw new Error('Failed to delete todo');
    }
};

// Toggle todo completion status
export const toggleTodo = async (id: string): Promise<Todo> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        const mockTodo = mockTodos.find(t => t.id === id);
        if (!mockTodo) {
            throw new Error('Todo not found');
        }
        return Promise.resolve({
            ...mockTodo,
            completed: !mockTodo.completed,
            updatedAt: new Date().toISOString()
        });
    }

    try {
        const todos = await getTodos();
        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            throw new Error('Todo not found');
        }

        const updatedTodo: Todo = {
            ...todos[todoIndex],
            completed: !todos[todoIndex].completed,
            updatedAt: new Date().toISOString()
        };

        todos[todoIndex] = updatedTodo;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

        return updatedTodo;
    } catch (error) {
        console.error('Failed to toggle todo:', error);
        throw new Error('Failed to toggle todo');
    }
};

// Get todo statistics
export const getTodoStats = async (): Promise<TodoStats> => {
    const todos = await getTodos();
    const completed = todos.filter(todo => todo.completed).length;

    return {
        total: todos.length,
        completed,
        pending: todos.length - completed
    };
};
