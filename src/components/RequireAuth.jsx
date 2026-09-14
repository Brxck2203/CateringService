import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RequireAuth({ children }) {
  const { session } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/acceso" state={{ returnTo: location.pathname }} replace />;
  }

  return children;
}

export default RequireAuth;
