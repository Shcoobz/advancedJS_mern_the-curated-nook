import {
  faPenToSquare,
  faSave,
  faTimes,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function CreateButton({ onClick, text }) {
  return (
    <button onClick={onClick} className='button'>
      {text}
    </button>
  );
}

export function EditButton({ onClick, className }) {
  return (
    <button
      className={`icon-button table__button-edit ${className || ''}`}
      onClick={onClick}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}

export function SaveButton({ handleSave, canSave }) {
  return (
    <button className='icon-button' title='Save' onClick={handleSave} disabled={!canSave}>
      <FontAwesomeIcon icon={faSave} />
    </button>
  );
}

export function DeleteButton({ handleDelete, className }) {
  return (
    <button
      className={`icon-button table__button-delete ${className || ''}`}
      title='Delete'
      onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

export function CloseButton({ onClick }) {
  return (
    <button
      className='icon-button table__button_close details__button-close'
      onClick={onClick}>
      <FontAwesomeIcon icon={faTimes} />
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
