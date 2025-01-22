// src/services/api.ts
import axios from 'axios';
import type { TodoType } from '../types/todo';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchTodos = (): Promise<{ data: TodoType[] }> =>
    apiClient.get('/todos');

export const createTodo = (todo: TodoType): Promise<void> =>
    apiClient.post('/todos', todo);

export const updateTodo = (id: number, todo: TodoType): Promise<void> =>
    apiClient.put(`/todos/${id}`, todo);

export const deleteTodo = (id: number): Promise<void> =>
    apiClient.delete(`/todos/${id}`);
