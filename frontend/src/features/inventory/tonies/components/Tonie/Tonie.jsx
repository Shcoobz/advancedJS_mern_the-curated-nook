import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTonieById } from '../../api/toniesApiSlice';

// function createHandleEdit(navigate, tonieId) {
//   return function handleEdit() {
//     navigate(`/backstage/tonies/${tonieId}`);
//   };
// }

function Tonie({ tonieId }) {
  // const navigate = useNavigate();
  const tonie = useSelector((state) => selectTonieById(state, tonieId));

  if (tonie) {
    // const handleEdit = createHandleEdit(navigate, tonieId);

    return (
      <tr className='table__row tonie'>
        <td className={`table__cell tonie__name`}>{tonie.name}</td>
        <td className={`table__cell tonie__description`}>{tonie.description}</td>

        <td className={`table__cell`}>
          <button className='icon-button table__button' onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export default Tonie;
