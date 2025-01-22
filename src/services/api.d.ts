declare module '@/services/api' {
    export interface TodoType {
        id: number;
        title: string;
        completed: boolean;
    }

    export function fetchTodos(): Promise<{ data: TodoType[] }>;
    export function createTodo(todo: TodoType): Promise<void>;
    export function updateTodo(id: number, todo: TodoType): Promise<void>;
    export function deleteTodo(id: number): Promise<void>;
}
