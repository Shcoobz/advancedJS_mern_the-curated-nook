import { useDeleteBookMutation, useUpdateBookMutation } from '../../api/booksApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import BookFormEditTable from './BookFormEditTable';
import {
  canSave,
  generateExistingBookPayload,
  validateISBN,
  validateTitle,
} from '../../../../utils/formUtils';
import { ENTITY } from '../../../../../config/common/constants';
import {
  useDeleteWishlistBookMutation,
  useUpdateWishlistBookMutation,
} from '../../api/booksWishlistApiSlice';
import EntityFormEdit from '../../../../entity/Components/EntityEdit/EntityFormEdit';

function BookFormEdit({ book, isOpen, onClose, isWishlist = false }) {
  const validations = {
    title: validateTitle,
    isbn: validateISBN,
  };

  const requiredFields = ['title', 'isbn'];
  const configuredCanSave = canSave(requiredFields);

  return (
    <EntityFormEdit
      entity={book}
      entityType={ENTITY.book}
      isOpen={isOpen}
      onClose={onClose}
      isWishlist={isWishlist}
      FormTable={BookFormEditTable}
      useUpdateMutation={useUpdateBookMutation}
      useUpdateWishlistMutation={useUpdateWishlistBookMutation}
      useDeleteMutation={useDeleteBookMutation}
      useDeleteWishlistMutation={useDeleteWishlistBookMutation}
      generateExistingPayload={generateExistingBookPayload}
      validations={validations}
      canSaveFunction={configuredCanSave}
      successMessages={TOAST.SUCCESS.BOOK}
    />
  );
}

export default BookFormEdit;
