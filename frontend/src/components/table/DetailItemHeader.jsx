import { CloseButton, DeleteButton, EditButton } from '../common/Buttons';

const DetailItemHeader = ({ title, handleEditClick, handleDelete, onClose }) => {
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

export default DetailItemHeader;
