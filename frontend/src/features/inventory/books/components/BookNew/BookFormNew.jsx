import { useAddNewBookMutation } from '../../api/booksApiSlice';
import { ENTITY } from '../../../../../config/common/constants';
import { generateNewBookPayload, validateTitle } from '../../../../utils/formUtils';
import BookFormTableNew from './BookFormNewTable';
import { handleIsbnScan, handleSelectSuggestion } from '../../../../utils/fetchUtils';
import { useAddNewWishlistBookMutation } from '../../api/booksWishlistApiSlice';
import EntityFormNew from '../../../../entity/Components/EntityNew/EntityFormNew';
import { formatDate, formatDateForInput } from '../../../../utils/utils';

function BookFormNew({ isOpen, onClose, isWishlist = false }) {
  const validations = {
    title: validateTitle,
  };

  const additionalProps = {
    handleDetectedIsbn: async (isbn, setFormData) => {
      await handleIsbnScan(isbn, setFormData);
    },
    handleSelectSuggestion: (selectedBook, setFormData) =>
      handleSelectSuggestion(selectedBook, 'book', setFormData),
    formatDate,
    formatDateForInput,
  };

  return (
    <EntityFormNew
      isOpen={isOpen}
      onClose={onClose}
      entity={ENTITY.book}
      addNewEntityMutation={useAddNewBookMutation}
      addNewWishlistEntityMutation={useAddNewWishlistBookMutation}
      FormTable={BookFormTableNew}
      generateNewEntityPayload={generateNewBookPayload}
      isWishlist={isWishlist}
      validations={validations}
      additionalProps={additionalProps}
    />
  );
}

export default BookFormNew;
