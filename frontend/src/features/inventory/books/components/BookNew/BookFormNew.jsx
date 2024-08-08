import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddNewBookMutation } from '../../api/booksApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import { ENTITY } from '../../../../../config/common/constants';
import {
  createInitialFormState,
  createUpdateField,
  generateNewBookPayload,
  handleSaveNewEntity,
  useHandleSuccess,
  useValidate,
  validateISBN,
  validateTitle,
} from '../../../../utils/formUtils';
import Modal from '../../../../../components/common/Modal';
import BookFormTableNew from './BookFormTableNew';
import IsbnScanner from '../../../../../components/common/IsbnScanner';

function BookFormNew({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewBook, { isLoading, isSuccess }] = useAddNewBookMutation();
  const [formData, setFormData] = useState(createInitialFormState(ENTITY.book));
  const [isScanning, setIsScanning] = useState(false);

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

  useHandleSuccess(ENTITY.book, isSuccess, undefined, navigate, setFormData);

  const handleSelectSuggestion = useCallback(
    (book) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        title: book.title,
        authors: book.authors.join(', '),
        publisher: book.publisher,
        publishedDate: book.publishedDate,
        description: book.description,
        isbn: book.isbn,
        categories: book.categories.join(', '),
        thumbnailUrl: book.thumbnailUrl,
        imageUrl: book.imageUrl,
        language: book.language,
      }));
    },
    [setFormData]
  );

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

  function handleScan() {
    setIsScanning(true);
  }

  const handleIsbnScan = useCallback(
    async (isbn) => {
      console.log('Barcode scanned:', isbn);
      setIsScanning(false);

      if (!isbn || isbn.length < 10) {
        toast.error('Invalid ISBN scanned. Please try again.');
        return;
      }

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
          const bookInfo = data.items[0].volumeInfo;
          const industryIdentifiers = bookInfo.industryIdentifiers || [];
          const isbn13 =
            industryIdentifiers.find((id) => id.type === 'ISBN_13')?.identifier || isbn;

          handleSelectSuggestion({
            title: bookInfo.title || 'Unknown Title',
            authors: bookInfo.authors || ['Unknown Author'],
            publisher: bookInfo.publisher || 'Unknown Publisher',
            publishedDate: bookInfo.publishedDate || '',
            description: bookInfo.description || '',
            isbn: isbn13,
            categories: bookInfo.categories || ['Uncategorized'],
            thumbnailUrl: bookInfo.imageLinks?.smallThumbnail || '',
            imageUrl: bookInfo.imageLinks?.thumbnail || '',
            language: bookInfo.language || 'unknown',
          });
          toast.success('Book information fetched successfully');
        } else {
          toast.error(`No book found with ISBN: ${isbn}`);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
        toast.error(`Error fetching book data: ${error.message}`);
      }
    },
    [handleSelectSuggestion]
  );

  const modalContent = (
    <>
      {isScanning ? (
        <IsbnScanner onDetected={handleIsbnScan} onClose={() => setIsScanning(false)} />
      ) : (
        <BookFormTableNew
          formData={formData}
          updateField={updateField}
          canSave={canSave}
          handleSave={handleSave}
          onClose={onClose}
          handleSelectSuggestion={handleSelectSuggestion}
          handleScan={handleScan}
        />
      )}
    </>
  );

  const modal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );

  return modal;
}

export default BookFormNew;
