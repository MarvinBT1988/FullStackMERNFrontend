import { getProductById, updateProduct } from '../../services/productService';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productZodSchema } from '../../schemas/product';
import ErrorMessage from '../../components/ErrorMessage';
const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        codigo: '',
        marca: ''
    });

    const fetchProduct = async () => {
        try {
            const response = await getProductById(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultado = productZodSchema.safeParse(formData);
            if (!resultado.success) {

                const listaErrores = resultado.error.issues.map(issue => ({
                    campo: issue.path[0],
                    mensaje: issue.message
                }));
                setErrors(listaErrores);
            }
            else {
                await updateProduct(id, formData);
                navigate('/products');
            }

        } catch (error) {
            console.error('Error updating product:', error);
        }
    }
    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Código:</label>
                    <input
                        type="text"
                        value={formData.codigo}
                        onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Descripcion:</label>
                    <textarea rows="4"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        value={formData.marca}
                        onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    />
                </div>
                <button type="submit">Actualizar Producto</button>
                <button type="button" onClick={() => navigate('/products')}>Cancelar</button>
            </form>
              <ErrorMessage errors={errors}/>  
        </div>
    );
}
export default EditProductPage;