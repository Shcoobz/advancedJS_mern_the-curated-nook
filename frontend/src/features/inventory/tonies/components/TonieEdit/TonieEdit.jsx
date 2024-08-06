import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectTonieById } from '../../api/toniesApiSlice';
import TonieFormEdit from './TonieFormEdit';
import Spinner from '../../../../../components/common/Spinner';

function TonieEdit() {
  const { id } = useParams();

  const tonie = useSelector((state) => selectTonieById(state, id));

  const content = tonie ? <TonieFormEdit tonie={tonie} /> : <Spinner />;

  return content;
}

export default TonieEdit;
