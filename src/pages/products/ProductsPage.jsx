import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Typography, TextField, Button, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Paper, 
    IconButton, Box, CircularProgress, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Snackbar, Alert, Stack
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

import { getProducts, deleteProduct } from '../../services/productService';
import { getAuthUser } from '../../utils/auth';

const ProductsPage = () => {
    const user = getAuthUser();
    const navigate = useNavigate();
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ codigo: '', nombre: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const hasPermission = user?.rol === 'ADMIN_ROLE' || user?.rol === 'INVENTORY_ROLE';

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts(formData);
            setProducts(response.data);
        } catch (error) {
            showNotification('Error al cargar productos', 'error');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => setNotification({ ...notification, open: false });

    const handleOpenDeleteDialog = (id) => {
        setSelectedProductId(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteProduct(selectedProductId);
            showNotification('Producto eliminado correctamente');
            fetchProducts();
        } catch (error) {
            showNotification('No se pudo eliminar el producto', 'error');
        } finally {
            setOpenDialog(false);
            setSelectedProductId(null);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Gestión de Productos
            </Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Código"
                            variant="outlined"
                            size="small"
                            value={formData.codigo}
                            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            variant="outlined"
                            size="small"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                            variant="contained" 
                            startIcon={<SearchIcon />} 
                            onClick={fetchProducts}
                            sx={{ flexGrow: 1 }}
                        >
                            Buscar
                        </Button>
                        {hasPermission && (
                            <Button 
                                variant="contained" 
                                color="success" 
                                startIcon={<AddIcon />}
                                onClick={() => navigate('/products/create')}
                                sx={{ flexGrow: 1 }}
                            >
                                Nuevo
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Paper>

            {/* TABLA CON SCROLL HORIZONTAL HABILITADO */}
            <TableContainer component={Paper} elevation={2} sx={{ width: '100%', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 800 }}> {/* Forzamos ancho mínimo para activar scroll */}
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Marca</TableCell>
                            {hasPermission && (
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                    Acciones
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product._id} hover>
                                    <TableCell><strong>{product.codigo}</strong></TableCell>
                                    <TableCell sx={{ minWidth: 150 }}>{product.nombre}</TableCell>
                                    <TableCell sx={{ minWidth: 200 }}>{product.descripcion || '-'}</TableCell>
                                    <TableCell>{product.marca || '-'}</TableCell>
                                    {hasPermission && (
                                        <TableCell align="center">
                                            {/* Stack evita que los botones salten de línea */}
                                            <Stack direction="row" spacing={1} justifyContent="center" sx={{ whiteSpace: 'nowrap' }}>
                                                <IconButton 
                                                    color="primary" 
                                                    size="small"
                                                    onClick={() => navigate(`/products/edit/${product._id}`)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton 
                                                    color="error" 
                                                    size="small"
                                                    onClick={() => handleOpenDeleteDialog(product._id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* DIALOG DE CONFIRMACIÓN */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>¿Confirmar eliminación?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Esta acción no se puede deshacer. El producto será borrado permanentemente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* NOTIFICACIONES */}
            <Snackbar 
                open={notification.open} 
                autoHideDuration={4000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProductsPage;