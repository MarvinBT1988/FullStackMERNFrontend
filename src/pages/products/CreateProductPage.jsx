import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Paper, Typography, TextField, Button, 
    Box, Grid, Divider, Stack 
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import { createProduct } from '../../services/productService';
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
        setErrors([]); 
        
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

    // Función para detectar si un campo específico tiene error (para marcar el TextField en rojo)
    const hasError = (fieldName) => errors.some(err => err.campo === fieldName);

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Crear Nuevo Producto
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Código"
                                variant="outlined"
                                value={formData.codigo}
                                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                                error={hasError('codigo')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                variant="outlined"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                error={hasError('nombre')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Descripción"
                                variant="outlined"
                                multiline
                                rows={2}
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                error={hasError('descripcion')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Marca"
                                variant="outlined"
                                value={formData.marca}
                                onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                                error={hasError('marca')}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    startIcon={<ArrowBackIcon />}
                                    onClick={() => navigate('/products')}
                                >
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    fullWidth 
                                    startIcon={<SaveIcon />}
                                    color="primary"
                                >
                                    Crear Producto
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>

                {/* Tu componente personalizado se mantiene aquí para manejar los mensajes */}
                <Box sx={{ mt: 3 }}>
                    <ErrorMessage errors={errors} />
                </Box>
            </Paper>
        </Container>
    );
};

export default CreateProductPage;