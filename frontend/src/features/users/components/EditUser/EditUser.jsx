import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../api/usersApiSlice';

import Spinner from '../../../../components/common/Spinner';
import EditUserForm from './EditUserForm';

function EditUser() {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserForm user={user} /> : <Spinner />;

  return content;
}

export default EditUser;
