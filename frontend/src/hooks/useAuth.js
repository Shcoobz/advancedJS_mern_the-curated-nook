import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/state/authSlice';

function useAuth() {
  const token = useSelector(selectCurrentToken);

  let isUser = true;
  let isSuperuser = false;
  let isAdmin = false;
  let highestStatus = isUser;

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isUser = roles.includes('User');
    isSuperuser = roles.includes('Superuser');
    isAdmin = roles.includes('Admin');

    if (isSuperuser) highestStatus = 'Superuser';
    if (isAdmin) highestStatus = 'Admin';

    return { username, roles, highestStatus, isSuperuser, isAdmin };
  }

  return { username: '', roles: [], isSuperuser, isAdmin, highestStatus };
}

export default useAuth;
