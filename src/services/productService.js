import api from '../api/axiosInstance';

export const getProducts = ()=> api.get('/products');
export const getProductById = (id)=> api.get(`/products/${id}`);
export const createProduct = (productData)=> api.post('/products', productData);
export const updateProduct = (id, productData)=> api.put(`/products/${id}`, productData);
export const deleteProduct = (id)=> api.delete(`/products/${id}`);