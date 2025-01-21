// // Spring Backend API와 통신하기 위해 Axios 추가

// import axios from 'axios';
// import { Todo } from '@/interfaces/Todod';// Todo 타입을 import (경로는 프로젝트 구조에 따라 조정)

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default {
//     getTodos() {
//         return axiosInstance.get<Todo[]>('/todos'); // 반환 타입 명시
//     },
//     getTodoById(id: number) {
//         return axiosInstance.get<Todo>(`/todos/${id}`); // 반환 타입 명시
//     },
//     createTodo(todo: Omit<Todo, 'id'>) { // ID가 없는 객체로 생성
//         return axiosInstance.post<Todo>('/todos', todo);
//     },
//     updateTodo(todo: Todo) { // ID가 포함된 객체로 업데이트
//         return axiosInstance.put<Todo>(`/todos/${todo.id}`, todo);
//     },
//     deleteTodo(id: number) {
//         return axiosInstance.delete<void>(`/todos/${id}`); // 삭제는 반환값이 없으므로 void
//     },
// };
