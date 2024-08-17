import {
  faHeart,
  faPenToSquare,
  faPlus,
  faSave,
  faTimes,
  faTrashCan,
  faBarcode,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function WishlistButton({ onClick }) {
  return (
    <button className='icon-button button__wishlist' title='Wishlist' onClick={onClick}>
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}

export function CreateButton({ onClick, text }) {
  return (
    <button className='icon-button button__create' title={text} onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export function ScanButton({ handleScan }) {
  return (
    <button className='icon-button button__scan' title='Scan' onClick={handleScan}>
      <FontAwesomeIcon icon={faBarcode} />
    </button>
  );
}

export function EditButton({ onClick, className }) {
  return (
    <button
      className={`icon-button button__edit ${className || ''}`}
      title='Edit'
      onClick={onClick}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  );
}

export function SaveButton({ handleSave, canSave }) {
  return (
    <button
      className='icon-button button__save'
      title='Save'
      onClick={handleSave}
      disabled={!canSave}>
      <FontAwesomeIcon icon={faSave} />
    </button>
  );
}

export function DeleteButton({ handleDelete, className }) {
  return (
    <button
      className={`icon-button button__delete ${className || ''}`}
      title='Delete'
      onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}

export function CloseButton({ onClick }) {
  return (
    <button className='icon-button button__close' title='Close' onClick={onClick}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
}

export function SubmitButton({ canSave }) {
  return (
    <button type='submit' className='button__submit' disabled={!canSave}>
      Submit
    </button>
  );
}
