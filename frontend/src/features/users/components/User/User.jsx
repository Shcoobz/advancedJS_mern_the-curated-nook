import { useSelector } from 'react-redux';
import { selectUserById } from '../../api/usersApiSlice';

import UserTableRow from '../Table/UserTableRow';

function User({ userId, onEdit }) {
  const user = useSelector((state) => selectUserById(state, userId));

  const content = <UserTableRow user={user} onEdit={onEdit} />;

  return content;
}

export default User;
