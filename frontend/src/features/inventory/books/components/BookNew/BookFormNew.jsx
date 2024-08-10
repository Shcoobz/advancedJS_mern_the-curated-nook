import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
  validateTitle,
} from '../../../../utils/formUtils';
import Modal from '../../../../../components/common/Modal';
import BookFormTableNew from './BookFormTableNew';

import IsbnScanner from '../../../../../components/common/IsbnScanner';
import {
  handleIsbnScan,
  handleScan,
  handleSelectSuggestion,
} from '../../../../utils/fetchUtils';

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

  useHandleSuccess(ENTITY.book, isSuccess, undefined, navigate, setFormData);

  async function handleDetectedIsbn(isbn) {
    await handleIsbnScan(isbn, setIsScanning, setFormData);
  }

  function onSelectSuggestion(book) {
    handleSelectSuggestion(book, undefined, setFormData);
  }

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
    <>
      {isScanning ? (
        <IsbnScanner
          onDetected={handleDetectedIsbn}
          onClose={() => setIsScanning(false)}
        />
      ) : (
        <BookFormTableNew
          formData={formData}
          updateField={updateField}
          canSave={canSave}
          handleSave={handleSave}
          onClose={onClose}
          handleSelectSuggestion={onSelectSuggestion}
          handleScan={() => handleScan(setIsScanning)}
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
