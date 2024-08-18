import { useNavigate } from 'react-router-dom';
import { useDeleteTonieMutation, useUpdateTonieMutation } from '../../api/toniesApiSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import TonieFormTableEdit from './TonieFormTableEdit';
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
import {
  useDeleteWishlistTonieMutation,
  useUpdateWishlistTonieMutation,
} from '../../api/tonieWishlistApiSlice';

function TonieFormEdit({ tonie, isOpen, onClose, isWishlist = false }) {
  const navigate = useNavigate();

  const [updateTonie] = useUpdateTonieMutation();
  const [updateWishlistTonie] = useUpdateWishlistTonieMutation();
  const [deleteTonie] = useDeleteTonieMutation();
  const [deleteWishlistTonie] = useDeleteWishlistTonieMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDelSuccess, setIsDelSuccess] = useState(false);
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
    setIsLoading(true);

    const updateTonieFn = isWishlist ? updateWishlistTonie : updateTonie;

    const result = await handleSaveExistingEntity(
      updateTonieFn,
      tonie,
      formData,
      generateExistingToniePayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsSuccess(true);
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    setIsLoading(true);

    const deleteTonieFn = isWishlist ? deleteWishlistTonie : deleteTonie;

    const result = await handleDeleteEntity(deleteTonieFn, tonie.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsDelSuccess(true);
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.deleted);
    }
  }

  const modalContent = (
    <TonieFormTableEdit
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

export default TonieFormEdit;
