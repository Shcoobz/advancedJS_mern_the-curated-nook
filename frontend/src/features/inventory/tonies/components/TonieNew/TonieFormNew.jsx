import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAddNewTonieMutation } from '../../api/toniesApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import { ENTITY } from '../../../../../config/common/constants';
import { useAddNewWishlistTonieMutation } from '../../api/tonieWishlistApiSlice';
import {
  createInitialFormState,
  createUpdateField,
  generateNewToniePayload,
  handleSaveNewEntity,
  useHandleSuccess,
  useValidate,
  validateName,
} from '../../../../utils/formUtils';
import Modal from '../../../../../components/common/Modal';
import TonieFormTableNew from './TonieFormTableNew';

function TonieFormNew({ isOpen, onClose, isWishlist = false }) {
  const navigate = useNavigate();

  const [addNewTonie] = useAddNewTonieMutation();
  const [addNewWishlistTonie] = useAddNewWishlistTonieMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.tonie));

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

  useHandleSuccess(ENTITY.tonie, isSuccess, undefined, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();
    setIsLoading(true);

    const addTonieFn = isWishlist ? addNewWishlistTonie : addNewTonie;

    const result = await handleSaveNewEntity(
      addTonieFn,
      formData,
      generateNewToniePayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsSuccess(true);
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.created);
    }
  }

  const modalContent = (
    <TonieFormTableNew
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

export default TonieFormNew;
