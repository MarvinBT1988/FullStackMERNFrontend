
import ProductsPage from './pages/products/ProductsPage'
import CreateProductPage from './pages/products/CreateProductPage'
import EditProductPage from './pages/products/EditProductPage'
import './App.css'
import { Routes, Route, Navigate,BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
