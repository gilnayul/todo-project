const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchTodos = () => axios.get(`${API_BASE_URL}/todos`);
export const createTodo = (todo) => axios.post(`${API_BASE_URL}/todos`, todo);
export const updateTodo = (id, todo) => axios.put(`${API_BASE_URL}/todos/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${API_BASE_URL}/todos/${id}`);
