import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddNewBookMutation } from '../../api/booksApiSlice';
import { DEFAULT } from '../../../../../config/common/constants';
import { TOAST } from '../../../../../config/common/messages';
import {
  getDefaultValue,
  handleSaveNewBook,
  useHandleBookSuccess,
  useValidateTitle,
} from '../bookUtils';
import Modal from '../../../../../components/common/Modal';
import { v4 as uuidv4 } from 'uuid';
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
    setLanguage
  );

  async function handleSave(e) {
    e.preventDefault();

    // const placeholderIsbn = isbn && isbn.trim() ? isbn.trim() : uuidv4();

    // setIsbn(placeholderIsbn);

    console.log('Final data being sent:', {
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
    });

    const result = await handleSaveNewBook(
      addNewBook,
      getDefaultValue(title),
      getDefaultValue(authors),
      getDefaultValue(publisher),
      getDefaultValue(publishedDate),
      getDefaultValue(description),
      getDefaultValue(isbn, uuidv4()),
      getDefaultValue(categories),
      getDefaultValue(thumbnailUrl),
      getDefaultValue(imageUrl),
      getDefaultValue(language)
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
      canSave={canSave}
      handleSave={handleSave}
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
