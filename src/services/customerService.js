import api from '../api/axiosInstance';

export const getCustomers = ()=> api.get('/customers');
export const getCustomerById = (id)=> api.get(`/customers/${id}`);
export const createCustomer = (customerData)=> api.post('/customers', customerData);
export const updateCustomer = (id, customerData)=> api.put(`/customers/${id}`, customerData);
export const deleteCustomer = (id)=> api.delete(`/customers/${id}`);