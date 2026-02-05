import { getCustomerById, updateCustomer } from '../../services/customerService';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerZodSchema } from '../../schemas/customer';
import ErrorMessage from '../../components/ErrorMessage';
const EditCustomerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        codigo: '',
        marca: ''
    });

    const fetchCustomer = async () => {
        try {
            const response = await getCustomerById(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching customer:', error);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultado = customerZodSchema.safeParse(formData);
            if (!resultado.success) {

                const listaErrores = resultado.error.issues.map(issue => ({
                    campo: issue.path[0],
                    mensaje: issue.message
                }));
                setErrors(listaErrores);
            }
            else {
                await updateCustomer(id, formData);
                navigate('/customers');
            }

        } catch (error) {
            let serverMessage="";
            if (error.response) {
                 serverMessage = error.response.data.error || 'Error en el servidor';               
            } else if (error.request) {
                serverMessage ='No se pudo conectar con el servidor';
                console.error(serverMessage);
            } else {
                serverMessage =error.message;
                console.error(serverMessage);
            }
             setErrors([{ campo: 'SERVER', mensaje: serverMessage }]);
        }
    }
    return (
        <div>
            <h1>Editar Cliente</h1>
            <form onSubmit={handleSubmit}>
               <div>
                    <label>DUI:</label>
                    <input
                        type="text"
                        value={formData.DUI}
                        onChange={(e) => setFormData({ ...formData, DUI: e.target.value })}
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
                    <label>Direccion:</label>
                    <textarea type="text"
                        value={formData.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}>
                    </textarea>
                </div>

                <div>
                    <label>Telefono:</label>
                    <input
                        type="text"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    />
                </div>
                <button type="submit">Actualizar Cliente</button>
                <button type="button" onClick={() => navigate('/customers')}>Cancelar</button>
            </form>
              <ErrorMessage errors={errors}/>  
        </div>
    );
}
export default EditCustomerPage;