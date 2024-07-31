import { toast } from 'react-toastify';
import { useDeleteUserMutation } from '../../api/usersApiSlice';
import { handleDeleteUser } from '../userUtils';
import { TOAST } from '../../../../config/common/messages';
import {
  CloseButton,
  DeleteButton,
  EditButton,
} from '../../../../components/common/Buttons';
import Modal from '../../../../components/common/Modal';

function UserDetails({ user, isOpen, onClose, onEdit }) {
  const [deleteUser] = useDeleteUserMutation();

  if (!user) return null;

  function handleEditClick() {
    const updatedUser = { ...user, isEditing: true };
    onEdit(updatedUser);
  }

  async function handleDelete(e) {
    e.preventDefault();

    const result = await handleDeleteUser(deleteUser, user.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.deleted);
    }
  }

  const content = (
    <>
      <div className='details-header__container'>
        <h2>User Details</h2>
        <div className='details-header__action-buttons'>
          <EditButton onClick={handleEditClick} />
          <DeleteButton handleDelete={handleDelete} />
          <CloseButton onClick={onClose} />
        </div>
      </div>
      <div className='details'>
        <div className='details__group'>
          <label className='details__label' htmlFor='username'>
            Username:
          </label>
          <p className='details__user'>{user?.username}</p>
        </div>
        <div className='details__group'>
          <label className='details__label' htmlFor='roles'>
            Roles:
          </label>
          <p className='details__user'>{user?.roles.join(', ')}</p>
        </div>
        <div className='details__group'>
          <label className='details__label' htmlFor='user-active'>
            Active:
          </label>
          <p className='details__user'>{user?.active ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {content}
    </Modal>
  );
}

export default UserDetails;
