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
    return await apiClient.get('/api/todos');
};

// Create a new todo
export const createTodo = async (todo: { text: string }): Promise<{ data: TodoType }> => {
    return await apiClient.post('/api/todos', todo);
};

// Update a todo
export const updateTodo = async (todo: TodoType): Promise<TodoType> => {
    const response = await axios.put<TodoType>(`/api/todos`, todo);
    return response.data;
    // return await apiClient.put(`/api/todos/${todo.id}`, todo);
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
    await apiClient.delete(`/api/todos/${id}`);
};
