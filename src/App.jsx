
import ProductsPage from './pages/products/ProductsPage'
import CreateProductPage from './pages/products/CreateProductPage'
import EditProductPage from './pages/products/EditProductPage'
import CustomersPage from './pages/customers/CustomersPage'
import CreateCustomerPage from './pages/customers/CreateCustomerPage'
import EditCustomerPage from './pages/customers/EditCustomerPage'
import UsersPage from './pages/users/UsersPage'
import CreateUserPage from './pages/users/CreateUserPage'
import EditUserPage from './pages/users/EditUserPage'
import LoginUserPage from './pages/users/LoginUserPage'
import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* --- RUTAS PÚBLICAS --- */}
            <Route index element={<Home />} />
            <Route path="/users/login" element={<LoginUserPage />} />

            {/* --- RUTAS: PRODUCTOS (Admin, Inventory, Sales) --- */}
            {/* --- PRODUCTOS: Acceso general para ver la lista --- */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN_ROLE', 'INVENTORY_ROLE', 'SALES_ROLE']} />}>
              <Route path="/products" element={<ProductsPage />} />
            </Route>

            {/* --- PRODUCTOS: Solo creación y edición (SALES queda fuera) --- */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN_ROLE', 'INVENTORY_ROLE']} />}>
              <Route path="/products/create" element={<CreateProductPage />} />
              <Route path="/products/edit/:id" element={<EditProductPage />} />
            </Route>

            {/* --- RUTAS: CLIENTES (Admin, Sales) --- */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN_ROLE', 'SALES_ROLE']} />}>
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/customers/create" element={<CreateCustomerPage />} />
              <Route path="/customers/edit/:id" element={<EditCustomerPage />} />
            </Route>

            {/* --- RUTAS: USUARIOS (Solo Admin) --- */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN_ROLE']} />}>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/create" element={<CreateUserPage />} />
              <Route path="/users/edit/:id" element={<EditUserPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
