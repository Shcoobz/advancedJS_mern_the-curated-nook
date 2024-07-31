import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useAddNewBookMutation } from '../../api/booksApiSlice';
import { DEFAULT } from '../../../../../config/common/constants';
import { TOAST } from '../../../../../config/common/messages';
import {
  setDefaultValue as setDefaultValue,
  handleSaveNewBook,
  setDefaultDate,
  useHandleBookSuccess,
  useValidateTitle,
} from '../bookUtils';

import Modal from '../../../../../components/common/Modal';
import NewBookFormTable from './NewBookFormTable';

function NewBookForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewBook, { isLoading, isSuccess }] = useAddNewBookMutation();

  const [title, setTitle] = useState(DEFAULT.emptyString);
  const [validTitle, setValidTitle] = useState(false);
  const [authors, setAuthors] = useState(DEFAULT.emptyString);
  const [publisher, setPublisher] = useState(DEFAULT.emptyString);
  const [publishedDate, setPublishedDate] = useState(DEFAULT.emptyString);
  const [description, setDescription] = useState(DEFAULT.emptyString);
  const [isbn, setIsbn] = useState(DEFAULT.emptyString);
  const [categories, setCategories] = useState(DEFAULT.emptyString);
  const [thumbnailUrl, setThumbnailUrl] = useState(DEFAULT.emptyString);
  const [imageUrl, setImageUrl] = useState(DEFAULT.emptyString);
  const [language, setLanguage] = useState(DEFAULT.emptyString);
  const [isOnWishlist, setIsOnWishlist] = useState(false);

  const canSave = Boolean(title) && !isLoading;

  useValidateTitle(title, setValidTitle);
  useHandleBookSuccess(
    isSuccess,
    undefined,
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

    const result = await handleSaveNewBook(
      addNewBook,
      setDefaultValue(title),
      setDefaultValue(authors),
      setDefaultValue(publisher),
      setDefaultDate(publishedDate),
      setDefaultValue(description),
      setDefaultValue(isbn, uuidv4()),
      setDefaultValue(categories),
      setDefaultValue(thumbnailUrl),
      setDefaultValue(imageUrl),
      setDefaultValue(language),
      isOnWishlist
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
