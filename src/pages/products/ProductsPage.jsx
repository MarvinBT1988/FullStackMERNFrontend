import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Typography, TextField, Button, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Paper, 
    IconButton, Box, CircularProgress, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Snackbar, Alert
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';

import { getProducts, deleteProduct } from '../../services/productService';
import { getAuthUser } from '../../utils/auth';

const ProductsPage = () => {
    const user = getAuthUser();
    const navigate = useNavigate();
    
    // Estados de datos
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ codigo: '', nombre: '' });

    // Estados para el Dialog (Confirmación de borrado)
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // Estados para el Snackbar (Notificaciones)
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

    // Funciones de notificación
    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => setNotification({ ...notification, open: false });

    // Manejo de eliminación con Dialog
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Gestión de Productos
            </Typography>

            {/* Panel de Filtros */}
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

            {/* Tabla */}
            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Código</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Marca</TableCell>
                            {hasPermission && <TableCell align="center">Acciones</TableCell>}
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
                                    <TableCell>{product.nombre}</TableCell>
                                    <TableCell>{product.descripcion || '-'}</TableCell>
                                    <TableCell>{product.marca || '-'}</TableCell>
                                    {hasPermission && (
                                        <TableCell align="center">
                                            <IconButton color="primary" onClick={() => navigate(`/products/edit/${product._id}`)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleOpenDeleteDialog(product._id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
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
                        Esta acción no se puede deshacer. El producto será borrado permanentemente de la base de datos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* SNACKBAR DE NOTIFICACIÓN */}
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