import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAddNewTonieMutation } from '../../api/toniesApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import NewTonieFormTable from './NewTonieFormTable';
import {
  createInitialFormState,
  createUpdateField,
  generateNewToniePayload,
  handleSaveNewEntity,
  useHandleSuccess,
  useValidate,
  validateName,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';

function NewTonieForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewTonie, { isLoading, isSuccess }] = useAddNewTonieMutation();
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

    const result = await handleSaveNewEntity(
      addNewTonie,
      formData,
      generateNewToniePayload
    );

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
