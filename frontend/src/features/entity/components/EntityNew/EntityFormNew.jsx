import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createInitialFormState,
  createUpdateField,
  handleSaveNewEntity,
  useHandleSuccess,
} from '../../../utils/formUtils';
import useValidations from '../../../../hooks/useValidation';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../config/common/messages';
import Modal from '../../../../components/common/Modal';
import IsbnScanner from '../../../../components/common/IsbnScanner';

function EntityFormNew({
  isOpen,
  onClose,
  entity,
  addNewEntityMutation,
  addNewWishlistEntityMutation,
  FormTable,
  generateNewEntityPayload,
  isWishlist = false,
  validations = {},
  canSaveFunction,
  additionalProps = {},
}) {
  const navigate = useNavigate();

  const [addNewEntity] = addNewEntityMutation();
  const [addNewWishlistEntity] = addNewWishlistEntityMutation
    ? addNewWishlistEntityMutation()
    : [null];
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(createInitialFormState(entity));
  const [isScanning, setIsScanning] = useState(false);

  const updateField = createUpdateField(setFormData);

  useValidations(formData, setFormData, validations);

  useHandleSuccess(entity, isSuccess, undefined, navigate, setFormData);

  const canSave = canSaveFunction
    ? canSaveFunction(formData, isLoading)
    : Boolean(formData[Object.keys(formData)[0]]) && !isLoading;

  async function handleSave(e) {
    e.preventDefault();
    setIsLoading(true);

    const addEntityFn = isWishlist ? addNewWishlistEntity : addNewEntity;

    const result = await handleSaveNewEntity(
      addEntityFn,
      formData,
      generateNewEntityPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsSuccess(true);
      onClose();
      toast.success(TOAST.SUCCESS[entity.toUpperCase()].created);
    }
    setIsLoading(false);
  }

  const modalContent = isScanning ? (
    <IsbnScanner
      onDetected={(isbn) => additionalProps.handleDetectedIsbn(isbn, setFormData)}
      onClose={() => setIsScanning(false)}
    />
  ) : (
    <FormTable
      formData={formData}
      updateField={updateField}
      canSave={canSave}
      handleSave={handleSave}
      onClose={onClose}
      {...additionalProps}
      handleSelectSuggestion={(selectedEntity) =>
        additionalProps.handleSelectSuggestion(selectedEntity, setFormData)
      }
      handleScan={() => setIsScanning(true)}
    />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );
}

export default EntityFormNew;
