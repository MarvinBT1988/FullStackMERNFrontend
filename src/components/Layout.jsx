import { Outlet, Link } from 'react-router-dom';
import { getAuthUser, isAuthenticated } from '../utils/auth';
import { Fragment } from 'react';
const Layout = () => {
  const user = getAuthUser();
  const auth = isAuthenticated();
  const links = [
    { to: "/products", label: "Productos", roles: ['ADMIN_ROLE', 'INVENTORY_ROLE', 'SALES_ROLE'] },
    { to: "/customers", label: "Clientes", roles: ['ADMIN_ROLE', 'SALES_ROLE'] },
    { to: "/users", label: "Usuarios", roles: ['ADMIN_ROLE'] },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="flex gap-4 container mx-auto">
          <Link to="/" className="hover:underline">Home</Link>|
          {auth ? (
            <Link to="/users/login" className="hover:underline">
               Cerrar sesión
            </Link>
          ) : (
            <Link to="/users/login" className="hover:underline">
              Iniciar sesión
            </Link>
          )}
          {links
            .filter(link => link.roles.includes(user?.rol)) // Filtramos por rol
            .map((link) => (
              <Fragment key={link.to}>
                {" | "}
                <Link to={link.to} className="hover:underline">
                  {link.label}
                </Link>
              </Fragment>
            ))
          }


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