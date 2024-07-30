import { faPenToSquare, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SaveButton({ handleSave, canSave }) {
  return (
    <button className='icon-button' title='Save' onClick={handleSave} disabled={!canSave}>
      <FontAwesomeIcon icon={faSave} />
    </button>
  );
}

export function EditButton({ onClick }) {
  return (
    <button className='icon-button table__button' onClick={onClick}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}

export function DeleteButton({ handleDelete }) {
  return (
    <button className='icon-button' title='Delete' onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

export function SubmitButton({ canSave }) {
  return (
    <button type='submit' className='submit-button' disabled={!canSave}>
      Submit
    </button>
  );
}
