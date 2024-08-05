import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import { useAddNewLegoMutation } from '../../api/legoApiSlice';
import { handleSaveNewLego, useValidateName } from '../legoUtils';
import Modal from '../../../../../components/common/Modal';
import NewLegoFormTable from './NewLegoFormTable';
import {
  createInitialFormState,
  createUpdateField,
  useHandleSuccess,
  useValidate,
  validateName,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';

function NewLegoForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewLego, { isLoading, isSuccess }] = useAddNewLegoMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.lego));

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

  useHandleSuccess(ENTITY.lego, isSuccess, undefined, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewLego(addNewLego, formData);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.created);
    }
  }

  const modalContent = (
    <NewLegoFormTable
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

export default NewLegoForm;
