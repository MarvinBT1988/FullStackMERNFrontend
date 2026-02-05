import api from '../api/axiosInstance';

export const getCustomers = (filtros) => {
    const filtrosLimpios = Object.fromEntries(
        Object.entries(filtros).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    );
    return api.get('/customers', {
        params: filtrosLimpios 
    });
};
export const getCustomerById = (id)=> api.get(`/customers/${id}`);
export const createCustomer = (customerData)=> api.post('/customers', customerData);
export const updateCustomer = (id, customerData)=> api.put(`/customers/${id}`, customerData);
export const deleteCustomer = (id)=> api.delete(`/customers/${id}`);