import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddNewBookMutation } from '../../api/booksApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import NewBookFormTable from './NewBookFormTable';
import {
  createInitialFormState,
  createUpdateField,
  generateNewBookPayload,
  handleSaveNewEntity,
  useHandleSuccess,
  useValidate,
  validateTitle,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';

function NewBookForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewBook, { isLoading, isSuccess }] = useAddNewBookMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.book));

  const canSave = Boolean(formData.title) && !isLoading;
  const updateField = createUpdateField(setFormData);

  useValidate(formData.title, validateTitle, (isValid) => {
    setFormData((prev) => {
      if (prev.validTitle !== isValid) {
        return { ...prev, validTitle: isValid };
      }
      return prev;
    });
  });

  useHandleSuccess(ENTITY.book, isSuccess, undefined, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewEntity(
      addNewBook,
      formData,
      generateNewBookPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.created);
    }
  }

  const modalContent = (
    <NewBookFormTable
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

export default NewBookForm;
