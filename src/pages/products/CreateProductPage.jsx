import { createProduct } from '../../services/productService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productZodSchema } from '../../schemas/product';
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
            {errors.length > 0 && (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
                    <h3 className="text-red-700 font-bold">Errores de validación:</h3>
                    <ul className="list-disc ml-5">
                        {errors.map((error, index) => (
                            <li key={index} className="text-red-600">
                                <strong>{error.campo}:</strong> {error.mensaje}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default CreateProductPage;