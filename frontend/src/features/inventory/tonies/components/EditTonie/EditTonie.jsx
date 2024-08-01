import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectTonieById } from '../../api/toniesApiSlice';
import EditTonieForm from './EditTonieForm';
import Spinner from '../../../../../components/common/Spinner';

function EditTonie() {
  const { id } = useParams();

  const tonie = useSelector((state) => selectTonieById(state, id));

  const content = tonie ? <EditTonieForm tonie={tonie} /> : <Spinner />;

  return content;
}

export default EditTonie;
