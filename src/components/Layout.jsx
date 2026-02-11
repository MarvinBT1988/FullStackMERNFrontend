import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, 
  ListItem, ListItemButton, ListItemIcon, ListItemText, 
  IconButton, Button, CssBaseline 
} from '@mui/material';
import {
  Inventory, People, Badge, LockReset, Home, 
  Logout, Login, Menu as MenuIcon 
} from '@mui/icons-material';

import { getAuthUser, isAuthenticated } from '../utils/auth';

const drawerWidth = 240;

const Layout = () => {
  const [user, setUser] = useState(getAuthUser());
  const [auth, setAuth] = useState(isAuthenticated());
  const [mobileOpen, setMobileOpen] = useState(false); // Estado para el menú móvil
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getAuthUser());
    setAuth(isAuthenticated());
  }, [location]);

  // Cerrar el menú móvil automáticamente al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const links = [
    { to: "/", label: "Home", icon: <Home />, roles: ['ADMIN_ROLE', 'INVENTORY_ROLE', 'SALES_ROLE'] },
    { to: "/products", label: "Productos", icon: <Inventory />, roles: ['ADMIN_ROLE', 'INVENTORY_ROLE', 'SALES_ROLE'] },
    { to: "/customers", label: "Clientes", icon: <People />, roles: ['ADMIN_ROLE', 'SALES_ROLE'] },
    { to: "/users", label: "Usuarios", icon: <Badge />, roles: ['ADMIN_ROLE'] },
    { to: "/users/changepassword", label: "Seguridad", icon: <LockReset />, roles: ['ADMIN_ROLE', 'INVENTORY_ROLE', 'SALES_ROLE'] },
  ];

  // Contenido del menú (extraído para reutilizarlo en móvil y escritorio)
  const drawerContent = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {links
            .filter(link => link.roles.includes(user?.rol))
            .map((link) => (
              <ListItem key={link.to} disablePadding>
                <ListItemButton 
                  component={Link} 
                  to={link.to}
                  selected={location.pathname === link.to}
                >
                  <ListItemIcon sx={{ color: location.pathname === link.to ? 'primary.main' : 'inherit' }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }} // Solo visible en móvil
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Sales System
          </Typography>
          
          <Button color="inherit" onClick={() => navigate('/users/login')} startIcon={auth ? <Logout /> : <Login />}>
            {auth ? "Salir" : "Entrar"}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Menú Lateral - Lógica Responsiva */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Versión MÓVIL (Temporal) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Mejora el rendimiento en móvil
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Versión ESCRITORIO (Permanente) */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 4 }, borderRadius: 2, minHeight: '80vh' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;