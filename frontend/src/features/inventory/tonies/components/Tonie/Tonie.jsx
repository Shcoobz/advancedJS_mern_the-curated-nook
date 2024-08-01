import { useSelector } from 'react-redux';
import { selectTonieById } from '../../api/toniesApiSlice';
import TonieTable from './TonieTable';

// function createHandleEdit(navigate, tonieId) {
//   return function handleEdit() {
//     navigate(`/backstage/tonies/${tonieId}`);
//   };
// }

function Tonie({ tonieId, onEdit }) {
  // const navigate = useNavigate();
  const tonie = useSelector((state) => selectTonieById(state, tonieId));

  if (!tonie) return null;

  const content = <TonieTable tonie={tonie} onEdit={onEdit} />;

  return content;
}

export default Tonie;
