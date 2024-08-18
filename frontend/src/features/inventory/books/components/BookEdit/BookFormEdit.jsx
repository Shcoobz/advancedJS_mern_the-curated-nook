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
  validateISBN,
  validateTitle,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';
import {
  useDeleteWishlistBookMutation,
  useUpdateWishlistBookMutation,
} from '../../api/booksWishlistApiSlice';

function BookFormEdit({ book, isOpen, onClose, isWishlist = false }) {
  const navigate = useNavigate();

  const [updateBook] = useUpdateBookMutation();
  const [updateWishlistBook] = useUpdateWishlistBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [deleteWishlistBook] = useDeleteWishlistBookMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDelSuccess, setIsDelSuccess] = useState(false);
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

  useValidate(formData.isbn, validateISBN, (isValid) => {
    setFormData((prev) => {
      if (prev.validIsbn !== isValid) {
        return { ...prev, validIsbn: isValid };
      }
      return prev;
    });
  });

  useHandleSuccess(ENTITY.book, isSuccess, isDelSuccess, navigate, setFormData);

  async function handleSave(e) {
    e.preventDefault();
    setIsLoading(true);

    const updateBookFn = isWishlist ? updateWishlistBook : updateBook;

    const result = await handleSaveExistingEntity(
      updateBookFn,
      book,
      formData,
      generateExistingBookPayload
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsSuccess(true);
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    setIsLoading(true);

    const deleteBookFn = isWishlist ? deleteWishlistBook : deleteBook;

    const result = await handleDeleteEntity(deleteBookFn, book.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      setIsDelSuccess(true);
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
    <Modal isOpen={isOpen} onClose={onClose} className='modal__book-edit'>
      {modalContent}
    </Modal>
  );

  return editBookFormModal;
}

export default BookFormEdit;
