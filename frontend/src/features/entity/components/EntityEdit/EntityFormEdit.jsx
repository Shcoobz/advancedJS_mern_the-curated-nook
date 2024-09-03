import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createInitialFormState,
  createUpdateField,
  handleDeleteEntity,
  handleSaveExistingEntity,
  useHandleSuccess,
} from '../../../utils/formUtils';
import { toast } from 'react-toastify';
import Modal from '../../../../components/common/Modal';
import useValidations from '../../../../hooks/useValidation';

function noopMutationHook() {
  return [() => {}, { isLoading: false, isSuccess: false }];
}

function EntityFormEdit({
  entity,
  entityType,
  isOpen,
  onClose,
  isWishlist = false,
  FormTable,
  useUpdateMutation,
  useUpdateWishlistMutation = noopMutationHook,
  useDeleteMutation,
  useDeleteWishlistMutation = noopMutationHook,
  generateExistingPayload,
  validations,
  canSaveFunction,
  successMessages,
}) {
  const navigate = useNavigate();

  const [updateEntity] = useUpdateMutation();
  const [updateWishlistEntity] = useUpdateWishlistMutation();
  const [deleteEntity] = useDeleteMutation();
  const [deleteWishlistEntity] = useDeleteWishlistMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDelSuccess, setIsDelSuccess] = useState(false);
  const [formData, setFormData] = useState(createInitialFormState(entityType, entity));

  const updateField = createUpdateField(setFormData);
  const canSave = canSaveFunction(formData, isLoading);

  useValidations(formData, setFormData, validations);
  useHandleSuccess(entityType, isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();
    setIsLoading(true);

    const updateEntityFn = isWishlist ? updateWishlistEntity : updateEntity;

    const result = await handleSaveExistingEntity(
      updateEntityFn,
      entity,
      formData,
      generateExistingPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsSuccess(true);
      onClose();
      toast.success(successMessages.updated);
    }
    setIsLoading(false);
  }

  async function handleDelete(e) {
    e.preventDefault();
    setIsLoading(true);

    const deleteEntityFn = isWishlist ? deleteWishlistEntity : deleteEntity;

    const result = await handleDeleteEntity(deleteEntityFn, entity.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsDelSuccess(true);
      onClose();
      toast.success(successMessages.deleted);
    }
    setIsLoading(false);
  }

  const modalContent = (
    <FormTable
      formData={formData}
      updateField={updateField}
      canSave={canSave}
      handleSave={handleSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`modal__${entityType}-edit`}>
      {modalContent}
    </Modal>
  );
}

export default EntityFormEdit;
