import axios from 'axios';
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
});

export const fetchTodos = () => api.get(`/todos`);
export const createTodo = (payload) => api.post(`/todos`, payload);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const updateTodo = (id, payload) => api.put(`/todos/${id}`, payload);

const apis = {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};

export default apis;
