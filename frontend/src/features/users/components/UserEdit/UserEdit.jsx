import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../api/usersApiSlice';

import Spinner from '../../../../components/common/Spinner';
import UserFormEdit from './UserFormEdit';

function UserEdit() {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <UserFormEdit user={user} /> : <Spinner />;

  return content;
}

export default UserEdit;
