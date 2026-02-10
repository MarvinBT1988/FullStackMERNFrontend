import api from '../api/axiosInstance';

export const getUsers = (filtros) => {
    const filtrosLimpios = Object.fromEntries(
        Object.entries(filtros).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    return api.get('/users', {
        params: filtrosLimpios 
    });
};
export const getUserById = (id)=> api.get(`/users/${id}`);
export const createUser = (userData)=> api.post('/users', userData);
export const updateUser = (id, userData)=> api.put(`/users/${id}`, userData);
export const loginUser = (userData)=> api.post('/users/login', userData);
export const changePasswordUser = (id, userData)=> api.put(`/users/${id}/change-password`, userData);