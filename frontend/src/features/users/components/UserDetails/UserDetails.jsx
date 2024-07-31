import { toast } from 'react-toastify';
import { useDeleteUserMutation } from '../../api/usersApiSlice';
import { handleDeleteUser } from '../userUtils';
import { TOAST } from '../../../../config/common/messages';
import Modal from '../../../../components/common/Modal';
import UserDetailsTable from './UserDetailsTable';

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
