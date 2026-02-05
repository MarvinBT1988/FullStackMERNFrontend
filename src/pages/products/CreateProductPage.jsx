import { createProduct } from '../../services/productService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productZodSchema } from '../../schemas/product';
import ErrorMessage from '../../components/ErrorMessage';
const CreateProductPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        codigo: '',
        marca: ''
    });
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
            } else {
                await createProduct(formData);
                navigate('/products');
            }

        } catch (error) {
            console.error('Error creating product:', error);
        }
    }
    { errors.name && <p className="text-red-500">{errors.name[0]}</p> }
    return (
        <div>
            <h1>Crear Nuevo Producto</h1>
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
                    <input
                        type="text"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    />
                </div>

                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        value={formData.marca}
                        onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    />
                </div>
                <button type="submit">Crear Producto</button>
                <button type="button" onClick={() => navigate('/products')}>Cancelar</button>
            </form>
          <ErrorMessage errors={errors}/>  
        </div>
    );
}
export default CreateProductPage;