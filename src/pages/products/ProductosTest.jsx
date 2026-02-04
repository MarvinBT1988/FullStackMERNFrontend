import { getProducts, deleteProduct } from '../../services/productService';
import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: ''
    });
   // const navigate = useNavigate();
   
    if (loading) {
        return <div>Cargando productos...</div>;
    }
    return (
        <div>
          <h1>Hola</h1>
        </div>
    );
}
export default ProductsPage;
