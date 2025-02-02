import axios from 'axios';
import type { TodoType } from '../interfaces/Todod';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch all todos
export const fetchTodos = async (): Promise<TodoType[]> => {
  const response = await axios.get<TodoType[]>('/api/todos');
  return response.data; // response가 아닌 response.data 반환
};

// Create a new todo
export const createTodo = async (todo: { text: string }): Promise<{ data: TodoType }> => {
    return await apiClient.post('/api/todos', todo);
};

// Update a todo
export const updateTodo = async (todo: TodoType): Promise<TodoType> => {
  const response = await axios.put<TodoType>(`/api/todos/${todo.id}`, todo);
  return response.data; // 직접 TodoType을 반환하도록 수정
};


// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`/api/todos/${id}`);
};
