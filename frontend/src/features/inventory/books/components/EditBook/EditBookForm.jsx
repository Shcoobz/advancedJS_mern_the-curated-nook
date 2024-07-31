import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useUpdateBookMutation } from '../../api/booksApiSlice';
import {
  handleDeleteBook,
  handleSaveExistingBook,
  useHandleBookSuccess,
  useValidateTitle,
} from '../bookUtils';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import EditBookFormTable from './EditBookFormTable';

function EditBookForm({ book, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateBook, { isLoading, isSuccess }] = useUpdateBookMutation();
  const [deleteBook, { isSuccess: isDelSuccess }] = useDeleteBookMutation();

  const [title, setTitle] = useState(book.title);
  const [validTitle, setValidTitle] = useState(false);
  const [authors, setAuthors] = useState(book.authors.join(', '));
  const [publisher, setPublisher] = useState(book.publisher);
  const [publishedDate, setPublishedDate] = useState(book.publishedDate);
  const [description, setDescription] = useState(book.description);
  const [isbn, setIsbn] = useState(book.isbn.join(', '));
  const [categories, setCategories] = useState(book.categories.join(', '));
  const [thumbnailUrl, setThumbnailUrl] = useState(book.thumbnailUrl);
  const [imageUrl, setImageUrl] = useState(book.imageUrl);
  const [language, setLanguage] = useState(book.language);
  const [isOnWishlist, setIsOnWishlist] = useState(book.isOnWishlist);

  const canSave = Boolean(title) && !isLoading;

  useValidateTitle(title, setValidTitle);
  useHandleBookSuccess(
    isSuccess,
    isDelSuccess,
    navigate,
    setTitle,
    setAuthors,
    setPublisher,
    setPublishedDate,
    setDescription,
    setIsbn,
    setCategories,
    setThumbnailUrl,
    setImageUrl,
    setLanguage,
    setIsOnWishlist
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingBook(
      updateBook,
      book,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      isbn,
      categories,
      thumbnailUrl,
      imageUrl,
      language,
      isOnWishlist
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
    const result = await handleDeleteBook(deleteBook, book.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.deleted);
    }
  }

  const modalContent = (
    <EditBookFormTable
      title={title}
      setTitle={setTitle}
      validTitle={validTitle}
      authors={authors}
      setAuthors={setAuthors}
      publisher={publisher}
      setPublisher={setPublisher}
      publishedDate={publishedDate}
      setPublishedDate={setPublishedDate}
      description={description}
      setDescription={setDescription}
      isbn={isbn}
      setIsbn={setIsbn}
      categories={categories}
      setCategories={setCategories}
      thumbnailUrl={thumbnailUrl}
      setThumbnailUrl={setThumbnailUrl}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      language={language}
      setLanguage={setLanguage}
      isOnWishlist={isOnWishlist}
      setIsOnWishlist={setIsOnWishlist}
      canSave={canSave}
      handleSave={handleSave}
      handleDelete={handleDelete}
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

export default EditBookForm;
