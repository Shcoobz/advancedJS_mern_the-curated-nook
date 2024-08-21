import {
  faHeart,
  faPenToSquare,
  faPlus,
  faSave,
  faTimes,
  faTrashCan,
  faBarcode,
  faWarehouse,
  faRightFromBracket,
  faUser,
  faBook,
  faGamepad,
  faCubes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function WishlistButton({ onClick }) {
  return (
    <button className='icon-button button__wishlist' title='Wishlist' onClick={onClick}>
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}

export function InventoryButton({ onClick }) {
  return (
    <button className='icon-button button__inventory' title='Inventory' onClick={onClick}>
      <FontAwesomeIcon icon={faWarehouse} />
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

export function ScanButton({ handleScan, className }) {
  return (
    <button
      className={`icon-button button__create ${className || ''}`}
      title='Scan'
      onClick={handleScan}>
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

export function LoginButton({
  component: Component = 'button',
  type,
  className,
  children,
  ...props
}) {
  return (
    <Component type={type} className={`login-button ${className}`} {...props}>
      {children}
    </Component>
  );
}

export function LogoutButton({ onClick }) {
  return (
    <button className='icon-button' title='Logout' onClick={onClick}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
}

const iconMapping = {
  user: faUser,
  book: faBook,
  tonie: faGamepad,
  lego: faCubes,
};

export function CreateHeaderButton({ onClick, title, item }) {
  const icon = iconMapping[item];

  return (
    <button
      className='icon-button backstage-header__create-button'
      onClick={onClick}
      title={title}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
