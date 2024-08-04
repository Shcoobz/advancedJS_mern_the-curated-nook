import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLegoById } from '../../api/legoApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import EditLegoForm from './EditLegoForm';

function EditLego() {
  const { id } = useParams();

  const lego = useSelector((state) => selectLegoById(state, id));

  const content = lego ? <EditLegoForm lego={lego} /> : <Spinner />;

  return content;
}

export default EditLego;
