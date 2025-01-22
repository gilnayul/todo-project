import type { TodoType } from '../types/todo';
import type { AxiosInstance } from 'axios'; // AxiosInstance 타입을 가져옵니다.

declare const apiClient: AxiosInstance;

declare function fetchTodos(): Promise<{ data: TodoType[] }>;
declare function createTodo(todo: TodoType): Promise<void>;
declare function updateTodo(id: number, todo: TodoType): Promise<void>;
declare function deleteTodo(id: number): Promise<void>;

export { apiClient, fetchTodos, createTodo, updateTodo, deleteTodo };
