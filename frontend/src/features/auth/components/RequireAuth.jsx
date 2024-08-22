import { useLocation, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const { roles } = useAuth();
  const context = useOutletContext();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet context={context} />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );

  return content;
}

export default RequireAuth;
