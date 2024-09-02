import { useDeleteBookMutation } from '../../api/booksApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import BookDetailsTable from './BookDetailsTable';
import EntityDetails from '../../../../entity/Components/entityDetails/entityDetails';

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
