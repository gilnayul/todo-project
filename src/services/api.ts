import axios from 'axios';
import type { TodoType } from '../interfaces/Todod';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch all todos
export const fetchTodos = async (): Promise<{ data: TodoType[] }> => {
    return await apiClient.get('/todos');
};

// Create a new todo
export const createTodo = async (todo: { text: string }): Promise<{ data: TodoType }> => {
    return await apiClient.post('/todos', todo);
};

// Update a todo
export const updateTodo = async (todo: TodoType): Promise<{ data: TodoType }> => {
    return await apiClient.put(`/todos/${todo.id}`, todo);
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
};
