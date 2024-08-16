import { useSelector } from 'react-redux';
import { selectTonieById } from '../../api/toniesApiSlice';
import TonieTable from './TonieTable';

function Tonie({ tonieId, onEdit, index }) {
  const tonie = useSelector((state) => selectTonieById(state, tonieId));

  if (!tonie) return null;

  const content = <TonieTable tonie={tonie} onEdit={onEdit} index={index} />;

  return content;
}

export default Tonie;
