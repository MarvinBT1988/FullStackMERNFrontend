import api from '../api/axiosInstance';

export const getUsers = ()=> api.get('/users');
export const getUserById = (id)=> api.get(`/users/${id}`);
export const createUser = (userData)=> api.post('/users', userData);
export const updateUser = (id, userData)=> api.put(`/users/${id}`, userData);
export const loginUser = (userData)=> api.post('/users/login', userData);
export const changePasswordUser = (id, userData)=> api.put(`/users/${id}/change-password`, userData);