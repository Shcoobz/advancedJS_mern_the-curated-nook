import { CloseButton, DeleteButton, EditButton } from './Buttons';

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

export function TableCellEdit({ onEdit, onDelete, item, statusClass, className }) {
  const handleEditCellClick = (e) => {
    e.stopPropagation();
  };

  return (
    <td
      className={`table__cell no-pointer ${statusClass || ''}`}
      onClick={handleEditCellClick}>
      <EditButton onClick={() => onEdit(item)} className={className || ''} />
      {/* <DeleteButton handleDelete={() => onDelete(item)} className={className || ''} /> */}
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
    <div className='details-header__container'>
      <h2>{title}</h2>
      <div className='details-header__action-buttons'>
        <EditButton onClick={handleEditClick} />
        <DeleteButton handleDelete={handleDelete} />
        <CloseButton onClick={onClose} />
      </div>
    </div>
  );
};

export function TableItemDetail({ label, value, className }) {
  return (
    <div className={`details__group ${className || ''}`}>
      <label className='details__label'>{label}</label>
      <p className='details__value'>{value}</p>
    </div>
  );
}
