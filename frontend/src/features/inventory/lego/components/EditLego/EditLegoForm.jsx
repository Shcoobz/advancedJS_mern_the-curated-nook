import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteLegoMutation, useUpdateLegoMutation } from '../../api/legoApiSlice';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import {
  createInitialFormState,
  handleDeleteLego,
  handleSaveExistingLego,
  useHandleLegoSuccess,
  useValidateName,
} from '../legoUtils';
import EditLegoFormTable from './EditLegoFormTable';
import { createUpdateField } from '../../../../utils/formUtils';

function EditLegoForm({ lego, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateLego, { isLoading, isSuccess }] = useUpdateLegoMutation();
  const [deleteLego, { isSuccess: isDelSuccess }] = useDeleteLegoMutation();
  const [formData, setFormData] = useState(createInitialFormState(lego));

  const canSave = Boolean(formData.name) && !isLoading;
  const updateField = createUpdateField(setFormData);

  useValidateName(formData.name, (isValid) => {
    setFormData((prev) => {
      if (prev.validName !== isValid) {
        return { ...prev, validName: isValid };
      }

      return prev;
    });
  });

  useHandleLegoSuccess(isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingLego(updateLego, lego, formData);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteLego(deleteLego, lego.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.deleted);
    }
  }

  const modalContent = (
    <EditLegoFormTable
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

export default EditLegoForm;
