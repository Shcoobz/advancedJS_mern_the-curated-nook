import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useUpdateBookMutation } from '../../api/booksApiSlice';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import {
  createInitialFormState,
  handleDeleteBook,
  handleSaveExistingBook,
  useHandleBookSuccess,
  useValidateTitle,
} from '../bookUtils';
import Modal from '../../../../../components/common/Modal';
import EditBookFormTable from './EditBookFormTable';

function EditBookForm({ book, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateBook, { isLoading, isSuccess }] = useUpdateBookMutation();
  const [deleteBook, { isSuccess: isDelSuccess }] = useDeleteBookMutation();
  const [formData, setFormData] = useState(createInitialFormState(book));

  const canSave = Boolean(formData.title) && !isLoading;

  useValidateTitle(formData.title, (isValid) => {
    setFormData((prev) => {
      if (prev.validTitle !== isValid) {
        return { ...prev, validTitle: isValid };
      }

      return prev;
    });
  });

  useHandleBookSuccess(isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();
    const result = await handleSaveExistingBook(updateBook, book, formData);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteBook(deleteBook, book.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.deleted);
    }
  }

  function updateField(field, value) {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  }

  const modalContent = (
    <EditBookFormTable
      formData={formData}
      updateField={updateField}
      canSave={canSave}
      handleSave={handleSave}
      handleDelete={handleDelete}
      onClose={onClose}
    />
  );

  const editBookFormModal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );

  return editBookFormModal;
}

export default EditBookForm;
