import { getProducts, deleteProduct } from '../../services/productService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: ''
    });
    const navigate = useNavigate();
   const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
        if (!confirmed) return;
        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

   useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Cargando productos...</div>;
    }
    return (
        <div>
           <form>
                <div>
                    <label>Código:</label>
                    <input 
                        type="text" 
                        value={formData.codigo}
                        onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        required
                    />
                </div>
               <button onClick={fetchProducts}>Refrescar</button>
              <button onClick={() => navigate('/products/create')}>Agregar Producto</button><br />
            </form>
            <h1>Lista de Productos</h1>
           
           
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Marca</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td><strong>{product.codigo}</strong></td>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion || ''}</td>
                            <td>{product.marca || ''}</td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => navigate(`/products/edit/${product._id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductsPage;
