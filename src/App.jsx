
import ProductsPage from './pages/products/ProductsPage'
import CreateProductPage from './pages/products/CreateProductPage'
import EditProductPage from './pages/products/EditProductPage'
import CustomersPage from './pages/customers/CustomersPage'
import CreateCustomerPage from './pages/customers/CreateCustomerPage'
import EditCustomerPage from './pages/customers/EditCustomerPage'
import UsersPage from './pages/users/UsersPage'
import CreateUserPage from './pages/users/CreateUserPage'
import EditUserPage from './pages/users/EditUserPage'
import './App.css'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from  './pages/Home'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/create" element={<CreateProductPage />} />
            <Route path="/products/edit/:id" element={<EditProductPage />} />   
            <Route path="/customers" element={<CustomersPage />} />  
            <Route path="/customers/create" element={<CreateCustomerPage />} />    
            <Route path="/customers/edit/:id" element={<EditCustomerPage />} /> 
            <Route path="/users" element={<UsersPage />} />     
            <Route path="/users/create" element={<CreateUserPage />} />
            <Route path="/users/edit/:id" element={<EditUserPage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
