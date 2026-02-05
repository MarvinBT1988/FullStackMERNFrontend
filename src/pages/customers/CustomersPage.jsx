import { getCustomers, deleteCustomer } from '../../services/customerService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        DUI: '',
        nombre: ''
    });
    const navigate = useNavigate();
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await getCustomers(formData);
            console.log(response);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este cliente?');
        if (!confirmed) return;
        try {
            await deleteCustomer(id);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    if (loading) {
        return <div>Cargando clientes...</div>;
    }
    return (
        <div>
            <form>
                <div>
                    <label>DUI:</label>
                    <input
                        type="text"
                        value={formData.DUI}
                        onChange={(e) => setFormData({ ...formData, DUI: e.target.value })}
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
                <button onClick={fetchCustomers}>Buscar</button>
                <button onClick={() => navigate('/customers/create')}>Agregar Cliente</button><br />
            </form>
            <h1>Lista de Clientes</h1>
            <table>
                <thead>
                    <tr>
                        <th>DUI</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td><strong>{customer.DUI}</strong></td>
                            <td>{customer.nombre}</td>
                            <td>{customer.direccion || ''}</td>
                            <td>{customer.telefono || ''}</td>
                            <td>
                                <button
                                    className="btn-edit"
                                    onClick={() => navigate(`/customers/edit/${customer._id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(customer._id)}
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
export default CustomersPage;
