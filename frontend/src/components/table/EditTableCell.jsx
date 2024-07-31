import { EditButton } from '../common/Buttons';

function EditTableCell({ onEdit, book }) {
  const handleEditCellClick = (e) => {
    e.stopPropagation();
  };

  return (
    <td className='table__cell no-pointer' onClick={handleEditCellClick}>
      <EditButton onClick={() => onEdit(book)} />
    </td>
  );
}

export default EditTableCell;
