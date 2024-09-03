import { useDeleteBookMutation } from '../../api/booksApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import EntityDetails from '../../../../entity/components/EntityDetails/EntityDetails';
import BookDetailsTable from './BookDetailsTable';

function BookDetails({ book, isOpen, onClose, onEdit }) {
  return (
    <EntityDetails
      entity={book}
      entityName='Book'
      isOpen={isOpen}
      onClose={onClose}
      onEdit={onEdit}
      useDeleteMutation={useDeleteBookMutation}
      DetailsTable={BookDetailsTable}
      successMessage={TOAST.SUCCESS.BOOK.deleted}
    />
  );
}

export default BookDetails;
