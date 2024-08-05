import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import { useAddNewLegoMutation } from '../../api/legoApiSlice';
import {
  createInitialFormState,
  handleSaveNewLego,
  useHandleLegoSuccess,
  useValidateName,
} from '../legoUtils';
import Modal from '../../../../../components/common/Modal';
import NewLegoFormTable from './NewLegoFormTable';
import { createUpdateField } from '../../../../utils/formUtils';

function NewLegoForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewLego, { isLoading, isSuccess }] = useAddNewLegoMutation();
  const [formData, setFormData] = useState(createInitialFormState());

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

  useHandleLegoSuccess(isSuccess, undefined, navigate, setFormData);

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
