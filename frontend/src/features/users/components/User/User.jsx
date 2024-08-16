import { useSelector } from 'react-redux';
import { selectUserById } from '../../api/usersApiSlice';
import UserTable from './UserTable';

function User({ userId, onEdit, index }) {
  const user = useSelector((state) => selectUserById(state, userId));

  if (!user) return null;

  const content = <UserTable user={user} onEdit={onEdit} index={index} />;

  return content;
}

export default User;
