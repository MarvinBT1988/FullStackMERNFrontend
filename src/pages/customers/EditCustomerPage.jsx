import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Stack, 
  Divider,
  CircularProgress 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

// Servicios y componentes
import { getCustomerById, updateCustomer } from '../../services/customerService';
import { customerZodSchema } from '../../schemas/customer';
import ErrorMessage from '../../components/ErrorMessage';

const EditCustomerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        direccion: '',
        DUI: '',
        telefono: ''
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await getCustomerById(id);
                // Mapeo de datos para asegurar que no haya valores null en los inputs
                setFormData({
                    nombre: response.data.nombre || '',
                    direccion: response.data.direccion || '',
                    DUI: response.data.DUI || '',
                    telefono: response.data.telefono || ''
                });
            } catch (error) {
                console.error('Error fetching customer:', error);
                setErrors([{ campo: 'SERVER', mensaje: 'No se pudo cargar la información del cliente.' }]);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const resultado = customerZodSchema.safeParse(formData);
            if (!resultado.success) {
                const listaErrores = resultado.error.issues.map(issue => ({
                    campo: issue.path[0],
                    mensaje: issue.message
                }));
                setErrors(listaErrores);
            } else {
                await updateCustomer(id, formData);
                navigate('/customers');
            }
        } catch (error) {
            let serverMessage = "";
            if (error.response) {
                serverMessage = error.response.data.error || 'Error en el servidor';
            } else if (error.request) {
                serverMessage = 'No se pudo conectar con el servidor';
            } else {
                serverMessage = error.message;
            }
            setErrors([{ campo: 'SERVER', mensaje: serverMessage }]);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Editar Cliente
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="DUI"
                                name="DUI"
                                value={formData.DUI}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre Completo"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Dirección"
                                name="direccion"
                                multiline
                                rows={3}
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    startIcon={<SaveIcon />}
                                >
                                    Actualizar Cliente
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    fullWidth
                                    size="large"
                                    onClick={() => navigate('/customers')}
                                    startIcon={<CancelIcon />}
                                >
                                    Cancelar
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {/* Tu componente de error original */}
                {errors.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Divider sx={{ mb: 2 }} />
                        <ErrorMessage errors={errors} />
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default EditCustomerPage;