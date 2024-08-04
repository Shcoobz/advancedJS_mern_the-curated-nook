import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddNewBookMutation } from '../../api/booksApiSlice';
import { DEFAULT } from '../../../../../config/common/constants';
import { TOAST } from '../../../../../config/common/messages';
import {
  createInitialFormState,
  handleSaveNewBook,
  useHandleBookSuccess,
  useValidateTitle,
} from '../bookUtils';

import Modal from '../../../../../components/common/Modal';
import NewBookFormTable from './NewBookFormTable';

function NewBookForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewBook, { isLoading, isSuccess }] = useAddNewBookMutation();
  const [formData, setFormData] = useState(createInitialFormState());

  const canSave = Boolean(formData.title) && !isLoading;

  useValidateTitle(formData.title, (isValid) => {
    setFormData((prev) => {
      if (prev.validTitle !== isValid) {
        return { ...prev, validTitle: isValid };
      }

      return prev;
    });
  });

  useHandleBookSuccess(isSuccess, undefined, navigate, resetFormData);

  function resetFormData() {
    setFormData(createInitialFormState());
  }

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewBook(addNewBook, formData);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.created);
    }
  }

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
