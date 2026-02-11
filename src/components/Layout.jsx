import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Button, 
  CssBaseline,
  Divider
} from '@mui/material';
import {
  Inventory, 
  People, 
  Badge, 
  LockReset, 
  Home as HomeIcon, 
  Logout, 
  Login, 
  Menu as MenuIcon 
} from '@mui/icons-material';

import { getAuthUser, isAuthenticated } from '../utils/auth';

const drawerWidth = 240;

const Layout = () => {
  const [user, setUser] = useState(getAuthUser());
  const [auth, setAuth] = useState(isAuthenticated());
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getAuthUser());
    setAuth(isAuthenticated());
  }, [location]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/users/login');
  };

  const links = [
    // Se añade 'public: true' para que Home siempre aparezca
    { to: "/", label: "Home", icon: <HomeIcon />, public: true }, 
    { to: "/products", label: "Productos", icon: <Inventory />, roles: ['ADMIN_ROLE', 'INVENTORY_ROLE', 'SALES_ROLE'] },
    { to: "/customers", label: "Clientes", icon: <People />, roles: ['ADMIN_ROLE', 'SALES_ROLE'] },
    { to: "/users", label: "Usuarios", icon: <Badge />, roles: ['ADMIN_ROLE'] },
    { to: "/users/changepassword", label: "Seguridad", icon: <LockReset />, roles: ['ADMIN_ROLE', 'INVENTORY_ROLE', 'SALES_ROLE'] },
  ];

  const drawerContent = (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      <Toolbar>
        <Typography variant="subtitle1" fontWeight="bold" color="primary">
          MENÚ PRINCIPAL
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1 }}>
        {links
          .filter(link => link.public || (user?.rol && link.roles?.includes(user.rol)))
          .map((link) => (
            <ListItem key={link.to} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                component={Link} 
                to={link.to}
                selected={location.pathname === link.to}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                    '&:hover': { bgcolor: 'primary.main' }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 'medium' }} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <CssBaseline />
      
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          bgcolor: 'white',
          color: 'text.primary',
          width: '100%'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Ventas <span style={{ color: '#1976d2' }}>App</span>
          </Typography>
          
          {auth && (
            <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', md: 'block' }, color: 'text.secondary' }}>
              {user?.nombre} | <b>{user?.rol}</b>
            </Typography>
          )}

          <Button 
            variant="outlined" 
            size="small"
            color={auth ? "error" : "primary"}
            onClick={auth ? handleLogout : () => navigate('/users/login')} 
            startIcon={auth ? <Logout /> : <Login />}
          >
            {auth ? "Salir" : "Entrar"}
          </Button>
        </Toolbar>
      </AppBar>

      <Box 
        component="nav" 
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid rgba(0,0,0,0.12)'
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden'
        }}
      >
        <Toolbar /> 
        
        <Box sx={{ 
          flexGrow: 1,
          p: { xs: 2, sm: 3 }, 
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ 
            flexGrow: 1,
            bgcolor: 'white', 
            p: { xs: 2, sm: 3 }, 
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            width: '100%',
            mx: 'auto',
            display: 'flex', // Añadido para ayudar al centrado del hijo
            flexDirection: 'column'
          }}>
            <Outlet />
          </Box>
        </Box>

        <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#f4f6f8' }}>
          <Typography variant="caption" color="text.disabled">
            © 2026 Sistema de Gestión de Ventas - Panel Administrativo
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;