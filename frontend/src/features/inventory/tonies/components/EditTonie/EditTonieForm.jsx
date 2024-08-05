import { useNavigate } from 'react-router-dom';
import { useDeleteTonieMutation, useUpdateTonieMutation } from '../../api/toniesApiSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import EditTonieFormTable from './EditTonieFormTable';
import Modal from '../../../../../components/common/Modal';
import {
  createInitialFormState,
  createUpdateField,
  generateExistingToniePayload,
  handleDeleteEntity,
  handleSaveExistingEntity,
  useHandleSuccess,
  useValidate,
  validateName,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';

function EditTonieForm({ tonie, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateTonie, { isLoading, isSuccess }] = useUpdateTonieMutation();
  const [deleteTonie, { isSuccess: isDelSuccess }] = useDeleteTonieMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.tonie, tonie));

  const canSave = Boolean(formData.name) && !isLoading;
  const updateField = createUpdateField(setFormData);

  useValidate(formData.name, validateName, (isValid) => {
    setFormData((prev) => {
      if (prev.validName !== isValid) {
        return { ...prev, validName: isValid };
      }
      return prev;
    });
  });

  useHandleSuccess(ENTITY.tonie, isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingEntity(
      updateTonie,
      tonie,
      formData,
      generateExistingToniePayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteEntity(deleteTonie, tonie.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.deleted);
    }
  }

  const modalContent = (
    <EditTonieFormTable
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

export default EditTonieForm;
