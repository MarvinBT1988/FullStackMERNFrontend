import api from '../api/axiosInstance';

export const getProducts = (filtros) => {
  return api.get('/products', {
    params: filtros // Aquí pasas el objeto con los datos
  });
};
export const getProductById = (id)=> api.get(`/products/${id}`);
export const createProduct = (productData)=> api.post('/products', productData);
export const updateProduct = (id, productData)=> api.put(`/products/${id}`, productData);
export const deleteProduct = (id)=> api.delete(`/products/${id}`);