
import ProductsPage from './pages/products/ProductsPage'
import './App.css'
import { Routes, Route, Navigate,BrowserRouter } from 'react-router-dom';
function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
      
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
