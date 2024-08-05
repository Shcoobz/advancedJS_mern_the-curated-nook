import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewUserMutation } from '../../api/usersApiSlice';
import { TOAST } from '../../../../config/common/messages';
import { toast } from 'react-toastify';
import Modal from '../../../../components/common/Modal';

import NewUserFormTable from './NewUserFormTable';
import {
  canSaveNewUserForm,
  createInitialFormState,
  createUpdateField,
  generateNewUserPayload,
  handleSaveNewEntity,
  useHandleSuccess,
  useValidate,
  validatePassword,
  validateUsername,
} from '../../../utils/formUtils';
import { ENTITY } from '../../../../config/common/constants';

function NewUserForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.user));

  const canSave = canSaveNewUserForm(formData, isLoading);
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

  useHandleSuccess(ENTITY.user, isSuccess, undefined, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewEntity(
      addNewUser,
      formData,
      generateNewUserPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.created);
    }
  }

  const modalContent = (
    <NewUserFormTable
      formData={formData}
      updateField={updateField}
      canSave={canSave}
      handleSave={handleSave}
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

export default NewUserForm;
