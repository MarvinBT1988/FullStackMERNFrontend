import { createUser } from '../../services/userService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userZodSchema } from '../../schemas/user';
import ErrorMessage from '../../components/ErrorMessage';
const CreateUserPage = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        rol: 'SALES_ROLE',
        status: 'active'
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultado = userZodSchema.safeParse(formData);

            if (!resultado.success) {

                const listaErrores = resultado.error.issues.map(issue => ({
                    campo: issue.path[0],
                    mensaje: issue.message
                }));
                setErrors(listaErrores);
            } else {
                await createUser(formData);
                navigate('/users');
            }

        } catch (error) {
            let serverMessage = "";
            if (error.response) {
                serverMessage = error.response.data.error || 'Error en el servidor';
            } else if (error.request) {
                serverMessage = 'No se pudo conectar con el servidor';
                console.error(serverMessage);
            } else {
                serverMessage = error.message;
                console.error(serverMessage);
            }
            setErrors([{ campo: 'SERVER', mensaje: serverMessage }]);
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <div>
            <h1>Crear Nuevo usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Rol:</label>
                    <select name="rol" value={formData.rol} onChange={handleChange}>
                        <option value="SALES_ROLE">Ventas</option>
                        <option value="INVENTORY_ROLE">Inventario</option>
                        <option value="ADMIN_ROLE">Administrador</option>
                    </select>
                </div>

                <div>
                    <label>Estado:</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>
                <button type="submit">Crear Cliente</button>
                <button type="button" onClick={() => navigate('/users')}>Cancelar</button>
            </form>
            <ErrorMessage errors={errors} />
        </div>
    );
}
export default CreateUserPage;