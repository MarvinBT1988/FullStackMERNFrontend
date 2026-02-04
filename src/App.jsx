
import ProductsPage from './pages/products/ProductsPage'
import './App.css'
import { Routes, Route, Navigate,BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <>
    <h1>Funciono</h1>
     <ProductsPage/>
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
