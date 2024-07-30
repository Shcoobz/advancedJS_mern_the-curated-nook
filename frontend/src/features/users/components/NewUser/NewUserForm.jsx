import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewUserMutation } from '../../api/usersApiSlice';
import { DEFAULT } from '../../../../config/common/constants';
import { TOAST } from '../../../../config/common/messages';
import {
  canSaveNewUserForm,
  handleSaveNewUser,
  useHandleUserSuccess,
  useValidatePassword,
  useValidateUsername,
} from '../userUtils';
import { toast } from 'react-toastify';
import Modal from '../../../../components/common/Modal';

import NewUserFormTable from './NewUserFormTable';

function NewUserForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();

  const [username, setUsername] = useState(DEFAULT.emptyString);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(['User']);

  const canSave = canSaveNewUserForm(
    roles.length,
    validUsername,
    validPassword,
    isLoading
  );

  useValidateUsername(username, setValidUsername);
  useValidatePassword(password, setValidPassword);
  useHandleUserSuccess(
    isSuccess,
    undefined,
    navigate,
    setUsername,
    setPassword,
    setRoles
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewUser(addNewUser, username, password, roles);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.created);
    }
  }

  const modalContent = (
    <NewUserFormTable
      username={username}
      setUsername={setUsername}
      validUsername={validUsername}
      password={password}
      setPassword={setPassword}
      validPassword={validPassword}
      roles={roles}
      setRoles={setRoles}
      canSave={canSave}
      handleSave={handleSave}
    />
  );

  const modal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );

  return modal;
}

export default NewUserForm;
