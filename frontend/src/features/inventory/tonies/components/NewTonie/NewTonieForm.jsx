import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAddNewTonieMutation } from '../../api/toniesApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import {
  createInitialFormState,
  handleSaveNewTonie,
  useHandleTonieSuccess,
  useValidateName,
} from '../tonieUtils';

import Modal from '../../../../../components/common/Modal';
import NewTonieFormTable from './NewTonieFormTable';
import { createUpdateField } from '../../../../utils/formUtils';

function NewTonieForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewTonie, { isLoading, isSuccess }] = useAddNewTonieMutation();
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

  useHandleTonieSuccess(isSuccess, undefined, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewTonie(addNewTonie, formData);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.TONIE.created);
    }
  }

  const modalContent = (
    <NewTonieFormTable
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

export default NewTonieForm;
