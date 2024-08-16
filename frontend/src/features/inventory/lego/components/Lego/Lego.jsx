import { useSelector } from 'react-redux';
import { selectLegoById } from '../../api/legoApiSlice';
import LegoTable from './LegoTable';

function Lego({ legoId, onEdit, index }) {
  const lego = useSelector((state) => selectLegoById(state, legoId));

  if (!lego) return null;

  const content = <LegoTable lego={lego} onEdit={onEdit} index={index} />;

  return content;
}

export default Lego;
