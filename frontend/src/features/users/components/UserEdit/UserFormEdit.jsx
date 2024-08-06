import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../config/common/messages';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../api/usersApiSlice';
import Modal from '../../../../components/common/Modal';
import UserFormTableEdit from './UserFormTableEdit';
import {
  canSaveExistingUserForm,
  createInitialFormState,
  createUpdateField,
  generateExistingUserPayload,
  handleDeleteEntity,
  handleSaveExistingEntity,
  useHandleSuccess,
  useValidate,
  validatePassword,
  validateUsername,
} from '../../../utils/formUtils';
import { ENTITY } from '../../../../config/common/constants';

function UserFormEdit({ user, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.user, user));

  const canSave = canSaveExistingUserForm(formData, isLoading);
  const updateField = createUpdateField(setFormData);

  useValidate(formData.username, validateUsername, (isValid) => {
    setFormData((prev) => {
      if (prev.validUsername !== isValid) {
        return { ...prev, validUsername: isValid };
      }
      return prev;
    });
  });

  useValidate(formData.password, validatePassword, (isValid) => {
    setFormData((prev) => {
      if (prev.validPassword !== isValid) {
        return { ...prev, validPassword: isValid };
      }
      return prev;
    });
  });

  useHandleSuccess(ENTITY.user, isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingEntity(
      updateUser,
      user,
      formData,
      generateExistingUserPayload
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
    const result = await handleDeleteEntity(deleteUser, user.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.deleted);
    }
  }

  const modalContent = (
    <UserFormTableEdit
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

export default UserFormEdit;
