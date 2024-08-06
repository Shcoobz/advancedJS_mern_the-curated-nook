import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useUpdateBookMutation } from '../../api/booksApiSlice';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import BookFormTableEdit from './BookFormTableEdit';
import {
  createInitialFormState,
  createUpdateField,
  generateExistingBookPayload,
  handleDeleteEntity,
  handleSaveExistingEntity,
  useHandleSuccess,
  useValidate,
  validateTitle,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';

function BookFormEdit({ book, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateBook, { isLoading, isSuccess }] = useUpdateBookMutation();
  const [deleteBook, { isSuccess: isDelSuccess }] = useDeleteBookMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.book, book));

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

  useHandleSuccess(ENTITY.book, isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingEntity(
      updateBook,
      book,
      formData,
      generateExistingBookPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteEntity(deleteBook, book.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.deleted);
    }
  }

  const modalContent = (
    <BookFormTableEdit
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

export default BookFormEdit;
