import { getUsers } from '../../services/userService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: ''
    });
    const navigate = useNavigate();
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers(formData);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching Users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }
    return (
        <div>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={formData.Nombre}
                        onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        value={formData.apellido}
                        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                        required
                    />
                </div>
                <button onClick={fetchUsers}>Buscar</button>
                <button onClick={() => navigate('/users/create')}>Agregar Usuario</button><br />
            </form>
            <h1>Lista de Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{`${user.nombre} ${user.apellido}`}</td>
                            <td>{user.email}</td>
                            <td>{user.telefono || 'N/A'}</td>
                            <td>
                                <span className={`badge-${user.rol.toLowerCase()}`}>
                                    {user.rol}
                                </span>
                            </td>
                            <td>
                                {user.status === 'active' ? '✅ Activo' : '❌ Inactivo'}
                            </td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => navigate(`/users/edit/${user._id}`)}
                                >
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default UsersPage;
