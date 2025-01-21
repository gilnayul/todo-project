import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

export const fetchTodos = () => {
    return axios.get(`${API_BASE_URL}/todos`);
};

export const createTodo = (todo) => {
    return axios.post(`${API_BASE_URL}/todos`, todo);
};

export const updateTodo = (id, todo) => {
    return axios.put(`${API_BASE_URL}/todos/${id}`, todo);
};

export const deleteTodo = (id) => {
    return axios.delete(`${API_BASE_URL}/todos/${id}`);
};
