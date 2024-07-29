import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../api/usersApiSlice';
import EditUserFormModal from './EditUserFormModal';
import Spinner from '../../../../components/common/Spinner';

function EditUser() {
  const { id } = useParams();

  const user = useSelector((state) => selectUserById(state, id));

  const content = user ? <EditUserFormModal user={user} /> : <Spinner />;

  return content;
}

export default EditUser;
