import { Navigate, Outlet } from 'react-router-dom';
import { getAuthUser, isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ allowedRoles }) => {
    const user = getAuthUser();
    const auth = isAuthenticated();
    if (!auth) {
        return <Navigate to="/users/login" replace />;
    }  
    if (allowedRoles && !allowedRoles.includes(user?.rol)) {
        return <Navigate to="/users/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;