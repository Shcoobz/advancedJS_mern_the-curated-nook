import { useSelector } from 'react-redux';
import { selectUserById } from '../../api/usersApiSlice';

import UserTable from './UserTable';

function User({ userId, onEdit }) {
  const user = useSelector((state) => selectUserById(state, userId));

  const content = <UserTable user={user} onEdit={onEdit} />;

  return content;
}

export default User;
