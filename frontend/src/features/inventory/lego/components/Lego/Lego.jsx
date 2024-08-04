import { useSelector } from 'react-redux';
import { selectLegoById } from '../../api/legoApiSlice';
import LegoTable from './LegoTable';

function Lego({ legoId, onEdit }) {
  const lego = useSelector((state) => selectLegoById(state, legoId));

  if (!lego) return null;

  const content = <LegoTable lego={lego} onEdit={onEdit} />;

  return content;
}

export default Lego;
