import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="flex gap-4 container mx-auto">
             <Link to="/" className="hover:underline">Home</Link>|
             <Link to="/products" className="hover:underline">Productos</Link> 
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-6">
        <Outlet /> 
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2026 Mi Aplicación React</p>
      </footer>
    </div>
  );
};

export default Layout;