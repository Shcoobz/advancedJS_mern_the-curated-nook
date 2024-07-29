import { useState } from 'react';
import Modal from '../../../../components/common/Modal';
import NewUserForm from './NewUserForm';

const UserFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    return setIsOpen(true);
  }

  function handleClose() {
    return setIsOpen(false);
  }

  return (
    <div>
      <button onClick={handleOpen}>Add New User</button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <NewUserForm />
      </Modal>
    </div>
  );
};

export default UserFormModal;
