import { toast } from 'react-toastify';
import { useDeleteUserMutation } from '../../api/usersApiSlice';
import { TOAST } from '../../../../config/common/messages';
import Modal from '../../../../components/common/Modal';
import UserDetailsTable from './UserDetailsTable';
import { handleDeleteEntity } from '../../../utils/formUtils';

function UserDetails({ user, isOpen, onClose, onEdit }) {
  const [deleteUser] = useDeleteUserMutation();

  if (!user) return null;

  function handleEditClick() {
    const updatedUser = { ...user, isEditing: true };
    onEdit(updatedUser);
  }

  async function handleDelete(e) {
    e.preventDefault();

    const result = await handleDeleteEntity(deleteUser, user.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.deleted);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='user__modal'>
      <UserDetailsTable
        user={user}
        onClose={onClose}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
      />
    </Modal>
  );
}

export default UserDetails;
