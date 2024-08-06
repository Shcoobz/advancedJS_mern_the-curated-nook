import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLegoById } from '../../api/legoApiSlice';
import Spinner from '../../../../../components/common/Spinner';
import LegoFormEdit from './LegoFormEdit';

function LegoEdit() {
  const { id } = useParams();

  const lego = useSelector((state) => selectLegoById(state, id));

  const content = lego ? <LegoFormEdit lego={lego} /> : <Spinner />;

  return content;
}

export default LegoEdit;
