import {
  CloseButton,
  CreateButton,
  DeleteButton,
  EditButton,
  InventoryButton,
  WishlistButton,
} from './Buttons';

export function TableDescription({ text }) {
  return <p className='table__description'>{text}</p>;
}

export function TableCell({ className, content, statusClass }) {
  return (
    <td className={`table__cell ${className || ''} ${statusClass || ''}`}>{content}</td>
  );
}

export function TableCellHeader({ label, className }) {
  return (
    <th scope='col' className={`table__th ${className || ''}`}>
      {label}
    </th>
  );
}

export function TableCellActions({ onEdit, handleDelete, item, statusClass, className }) {
  const handleEditCellClick = (e) => {
    e.stopPropagation();
  };

  return (
    <td
      className={`table__cell no-pointer ${statusClass || ''}`}
      onClick={handleEditCellClick}>
      <div className='list__action-buttons'>
        <EditButton onClick={() => onEdit(item)} className={className || ''} />
        <DeleteButton
          handleDelete={() => handleDelete(item)}
          className={className || ''}
        />
      </div>
    </td>
  );
}

export const TableItemDetailHeader = ({
  title,
  handleEditClick,
  handleDelete,
  onClose,
}) => {
  return (
    <div className='form-header__container'>
      <h2>{title}</h2>
      <div className='form-header__action-buttons'>
        <EditButton onClick={handleEditClick} />
        <DeleteButton handleDelete={handleDelete} />
        <CloseButton onClick={onClose} />
      </div>
    </div>
  );
};

export function TableItemDetail({ label, value, className }) {
  return (
    <div className={`form__group ${className || ''}`}>
      <label className='form__label'>{label}</label>
      <p className='form__value'>{value}</p>
    </div>
  );
}

export function TableAboveHeader({
  descriptionText,
  onCreateClick,
  actionOnClick,
  createButtonText,
  isWishlist,
}) {
  return (
    <div className='table__above-header'>
      <TableDescription text={descriptionText} />
      <div className='above-header buttons__action'>
        <CreateButton onClick={onCreateClick} text={createButtonText} />
        {isWishlist && actionOnClick && <WishlistButton onClick={actionOnClick} />}
        {!isWishlist && actionOnClick && <InventoryButton onClick={actionOnClick} />}
      </div>
    </div>
  );
}

export function TableItemDetailImage({ src, alt, title, className }) {
  return <img src={src} alt={alt} title={title} className={className} />;
}
