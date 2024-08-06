import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import { useAddLegoNewMutation } from '../../api/legoApiSlice';
import Modal from '../../../../../components/common/Modal';
import LegoNewFormTable from './LegoFormTableNew';
import {
  createInitialFormState,
  createUpdateField,
  generateLegoNewPayload,
  handleSaveNewEntity,
  useHandleSuccess,
  useValidate,
  validateName,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';

function LegoNewForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addLegoNew, { isLoading, isSuccess }] = useAddLegoNewMutation();
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

    const result = await handleSaveNewEntity(
      addLegoNew,
      formData,
      generateLegoNewPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.LEGO.created);
    }
  }

  const modalContent = (
    <LegoNewFormTable
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

export default LegoNewForm;
