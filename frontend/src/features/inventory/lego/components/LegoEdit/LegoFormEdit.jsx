import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteLegoMutation, useUpdateLegoMutation } from '../../api/legoApiSlice';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import LegoFormTableEdit from './LegoFormTableEdit';
import {
  createInitialFormState,
  createUpdateField,
  generateExistingLegoPayload,
  handleDeleteEntity,
  handleSaveExistingEntity,
  useHandleSuccess,
  useValidate,
  validateName,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';

function LegoFormEdit({ lego, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateLego, { isLoading, isSuccess }] = useUpdateLegoMutation();
  const [deleteLego, { isSuccess: isDelSuccess }] = useDeleteLegoMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.lego, lego));

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

  useHandleSuccess(ENTITY.lego, isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingEntity(
      updateLego,
      lego,
      formData,
      generateExistingLegoPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteEntity(deleteLego, lego.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.deleted);
    }
  }

  const modalContent = (
    <LegoFormTableEdit
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

export default LegoFormEdit;
