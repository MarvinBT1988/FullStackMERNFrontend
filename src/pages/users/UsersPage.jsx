import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Typography, TextField, Button, Table, TableBody, 
    TableCell, TableContainer, TableHead, TableRow, Paper, 
    IconButton, Box, CircularProgress, Grid, Chip, Avatar
} from '@mui/material';
import { 
    Edit as EditIcon, 
    PersonAdd as PersonAddIcon, 
    Search as SearchIcon,
    AdminPanelSettings as AdminIcon,
    Person as UserIcon
} from '@mui/icons-material';

import { getUsers } from '../../services/userService';

const UsersPage = () => {
    const navigate = useNavigate();
    
    // Estados
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: ''
    });

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

    // Función para renderizar el Chip del Rol
    const getRoleChip = (rol) => {
        const isAdmin = rol === 'ADMIN_ROLE';
        return (
            <Chip 
                icon={isAdmin ? <AdminIcon /> : <UserIcon />} 
                label={rol} 
                variant="outlined" 
                color={isAdmin ? "secondary" : "default"}
                size="small"
            />
        );
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Control de Usuarios
            </Typography>

            {/* Panel de Filtros */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Grid container spacing={2} alignItems="center">
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
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Apellido"
                            variant="outlined"
                            size="small"
                            value={formData.apellido}
                            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: 1 }}>
                        <Button 
                            variant="contained" 
                            startIcon={<SearchIcon />} 
                            onClick={fetchUsers}
                            sx={{ flexGrow: 1 }}
                        >
                            Buscar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="success" 
                            startIcon={<PersonAddIcon />}
                            onClick={() => navigate('/users/create')}
                            sx={{ flexGrow: 1 }}
                        >
                            Nuevo
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabla de Usuarios */}
            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    <CircularProgress size={30} />
                                    <Typography variant="body2" sx={{ mt: 1 }}>Cargando usuarios...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    No se encontraron usuarios.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user._id} hover>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32, fontSize: '0.9rem' }}>
                                                {user.nombre.charAt(0)}{user.apellido.charAt(0)}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {`${user.nombre} ${user.apellido}`}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.telefono || ''}</TableCell>
                                    <TableCell>{getRoleChip(user.rol)}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={user.status === 'active' ? 'Activo' : 'Inactivo'} 
                                            color={user.status === 'active' ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton 
                                            color="primary" 
                                            size="small"
                                            onClick={() => navigate(`/users/edit/${user._id}`)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UsersPage;