import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Divider,
  MenuItem
} from '@mui/material';

import { getUserById, changePasswordUser } from '../../services/userService';
import { changePasswordSchema } from '../../schemas/user';
import { getAuthUser } from '../../utils/auth';
import ErrorMessage from '../../components/ErrorMessage';

const ChangePasswordUserPage = () => {
    const navigate = useNavigate();
    const userInfo = getAuthUser();
    
    const [errors, setErrors] = useState([]); // Mantenemos el array para tu componente
    const [formData, setFormData] = useState({
        nombre: '', apellido: '', email: '', telefono: '', rol: ''    
    });
    const [formDataChange, setFormDataChange] = useState({       
        newPassword:'',
        currentPassword:''
    });

    const fetchUser = async () => {
        try {
            const response = await getUserById(userInfo.id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => { fetchUser(); }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataChange({ ...formDataChange, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]); // Limpiar errores previos

        try {
            const resultado = changePasswordSchema.safeParse(formDataChange);
            
            if (!resultado.success) {
                const listaErrores = resultado.error.issues.map(issue => ({
                    campo: issue.path[0],
                    mensaje: issue.message
                }));
                setErrors(listaErrores);
            } else {
                await changePasswordUser(userInfo.id, formDataChange);
                navigate('/users/login');
            }
        } catch (error) {
            let serverMessage = "";
            if (error.response) {
                serverMessage = error.response.data.msg || 'Error en el servidor';               
            } else if (error.request) {
                serverMessage = 'No se pudo conectar con el servidor';
            } else {
                serverMessage = error.message;
            }
            setErrors([{ campo: 'SERVER', mensaje: serverMessage }]);
        }
    }      

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                    Cambiar Password
                </Typography>

                {/* Sección de solo lectura */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Nombre" value={formData.nombre} disabled variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Apellido" value={formData.apellido} disabled variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Email" value={formData.email} disabled variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Teléfono" value={formData.telefono || ''} disabled variant="outlined" size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            select 
                            fullWidth 
                            label="Rol" 
                            value={formData.rol || 'SALES_ROLE'} 
                            disabled 
                            variant="outlined" 
                            size="small"
                        >
                            <MenuItem value="SALES_ROLE">Ventas</MenuItem>
                            <MenuItem value="INVENTORY_ROLE">Inventario</MenuItem>
                            <MenuItem value="ADMIN_ROLE">Administrador</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Formulario de cambio */}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="password"
                                name="currentPassword"
                                label="Contraseña Actual"
                                value={formDataChange.currentPassword}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="password"
                                name="newPassword"
                                label="Nueva Contraseña"
                                value={formDataChange.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* Tu componente de error se mantiene aquí */}
                    <Box sx={{ mt: 2 }}>
                        <ErrorMessage errors={errors} />
                    </Box>

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            fullWidth
                        >
                            Cambiar password
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="inherit"
                            fullWidth 
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default ChangePasswordUserPage;