import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../config/common/messages';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../api/usersApiSlice';
import {
  canSaveExistingUserForm,
  createInitialFormState,
  handleDeleteUser,
  handleSaveExistingUser,
  useHandleUserSuccess,
  useValidatePassword,
  useValidateUsername,
} from '../userUtils';
import Modal from '../../../../components/common/Modal';
import EditUserFormTable from './EditUserFormTable';
import { createUpdateField } from '../../../utils/formUtils';

function EditUserForm({ user, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation();
  const [formData, setFormData] = useState(createInitialFormState(user));

  const canSave = canSaveExistingUserForm(formData, isLoading);
  const updateField = createUpdateField(setFormData);

  useValidateUsername(formData, (isValid) => {
    setFormData((prev) => {
      if (prev.validUsername !== isValid) {
        return { ...prev, validUsername: isValid };
      }
      return prev;
    });
  });

  useValidatePassword(formData, (isValid) => {
    setFormData((prev) => {
      if (prev.validPassword !== isValid) {
        return { ...prev, validPassword: isValid };
      }
      return prev;
    });
  });

  useHandleUserSuccess(isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingUser(updateUser, user, formData);

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
      formData={formData}
      updateField={updateField}
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
