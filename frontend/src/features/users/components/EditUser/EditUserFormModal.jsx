import { useState } from 'react';
import Modal from '../../../../components/common/Modal';
import EditUserForm from './EditUserForm';

function EditUserModal({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    return setIsOpen(true);
  }

  function handleClose() {
    return setIsOpen(false);
  }

  return (
    <div>
      <button onClick={handleOpen}>Edit User</button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <EditUserForm user={user} />
      </Modal>
    </div>
  );
}

export default EditUserModal;
