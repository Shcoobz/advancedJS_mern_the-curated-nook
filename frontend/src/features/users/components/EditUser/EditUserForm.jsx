import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DEFAULT } from '../../../../config/common/constants';
import { TOAST } from '../../../../config/common/messages';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../api/usersApiSlice';
import {
  canSaveExistingUserForm,
  handleDeleteUser,
  handleSaveExistingUser,
  useHandleUserSuccess,
  useValidatePassword,
  useValidateUsername,
} from '../userUtils';
import Modal from '../../../../components/common/Modal';
import EditUserFormTable from './EditUserFormTable';

function EditUserForm({ user, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState(DEFAULT.emptyString);
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  const canSave = canSaveExistingUserForm(
    roles.length,
    validUsername,
    validPassword,
    isLoading,
    password
  );

  useValidateUsername(username, setValidUsername);
  useValidatePassword(password, setValidPassword);
  useHandleUserSuccess(
    isSuccess,
    isDelSuccess,
    navigate,
    setUsername,
    setPassword,
    setRoles
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingUser(
      updateUser,
      user.id,
      username,
      password,
      roles,
      active
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.updated);
    }
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

  const modalContent = (
    <EditUserFormTable
      username={username}
      setUsername={setUsername}
      validUsername={validUsername}
      password={password}
      setPassword={setPassword}
      validPassword={validPassword}
      roles={roles}
      setRoles={setRoles}
      active={active}
      setActive={setActive}
      canSave={canSave}
      handleSave={handleSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );

  const modal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );

  return modal;
}

export default EditUserForm;
