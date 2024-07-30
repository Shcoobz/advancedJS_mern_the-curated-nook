import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function EditButton({ onClick }) {
  return (
    <button className='icon-button table__button' onClick={onClick}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}
