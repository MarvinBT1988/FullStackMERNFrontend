import { Outlet, Link } from 'react-router-dom';
import { getAuthUser } from '../utils/auth';
const Layout = () => {
  const user = getAuthUser();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="flex gap-4 container mx-auto">
          <Link to="/" className="hover:underline">Home</Link>|
          <Link to="/products" className="hover:underline">Productos</Link> |
          <Link to="/customers" className="hover:underline">Clientes</Link> |
          <Link to="/users/login" className="hover:underline">Iniciar session</Link>
          {user?.rol === 'ADMIN_ROLE' && (
            <Link to="/users" className="hover:underline">Usuarios</Link>
          )}
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