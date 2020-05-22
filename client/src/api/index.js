import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export const fetchTodos = () => api.get(`/todos`);
export const createTodo = (payload) => api.post(`/todos`, payload);

const apis = {
  fetchTodos,
  createTodo,
};

export default apis;
