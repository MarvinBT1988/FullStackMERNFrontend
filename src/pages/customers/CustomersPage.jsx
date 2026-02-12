import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, TextField, Button, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, Box, CircularProgress, Grid,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Snackbar, Alert
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Search as SearchIcon
} from '@mui/icons-material';

import { getCustomers, deleteCustomer } from '../../services/customerService';

const CustomersPage = () => {
    const navigate = useNavigate();

    // Estados principales
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ DUI: '', nombre: '' });

    // Estados para UI (MUI)
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await getCustomers(formData);
            setCustomers(response.data);
        } catch (error) {
            showNotification('Error al obtener los clientes', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Control de notificaciones
    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => setNotification({ ...notification, open: false });

    // Lógica de eliminación
    const handleOpenDeleteDialog = (id) => {
        setSelectedCustomerId(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCustomer(selectedCustomerId);
            showNotification('Cliente eliminado con éxito');
            fetchCustomers();
        } catch (error) {
            showNotification('No se pudo eliminar al cliente', 'error');
        } finally {
            setOpenDialog(false);
            setSelectedCustomerId(null);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Gestión de Clientes
            </Typography>
            {/* Panel de Búsqueda */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="DUI"
                            variant="outlined"
                            size="small"
                            value={formData.DUI}
                            onChange={(e) => setFormData({ ...formData, DUI: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Nombre del Cliente"
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
                            onClick={fetchCustomers}
                            sx={{ flexGrow: 1 }}
                        >
                            Buscar
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/customers/create')}
                            sx={{ flexGrow: 1 }}
                        >
                            Nuevo
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabla de Clientes */}
            <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>DUI</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                                    <CircularProgress />
                                    <Typography variant="body2" sx={{ mt: 2 }}>Cargando clientes...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : customers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                                    No se encontraron clientes registrados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            customers.map((customer) => (
                                <TableRow key={customer._id} hover>
                                    <TableCell><strong>{customer.DUI}</strong></TableCell>
                                    <TableCell>{customer.nombre}</TableCell>
                                    <TableCell>{customer.direccion || 'N/A'}</TableCell>
                                    <TableCell>{customer.telefono || 'Sin teléfono'}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                            <IconButton
                                                color="primary"
                                                size="small"
                                                onClick={() => navigate(`/customers/edit/${customer._id}`)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => handleOpenDeleteDialog(customer._id)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal de Confirmación */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>¿Eliminar cliente?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Esta acción borrará permanentemente al cliente de la base de datos y no podrá recuperarse.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(false)} color="inherit">Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
                        Sí, eliminar cliente
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Notificaciones Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={notification.severity} variant="filled">
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CustomersPage;