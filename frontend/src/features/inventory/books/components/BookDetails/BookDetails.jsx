import { toast } from 'react-toastify';
import { useDeleteBookMutation } from '../../api/booksApiSlice';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import BookDetailsTable from './BookDetailsTable';
import { handleDeleteEntity } from '../../../../utils/formUtils';

function BookDetails({ book, isOpen, onClose, onEdit }) {
  const [deleteBook] = useDeleteBookMutation();

  if (!book) return null;

  function handleEditClick() {
    const updatedBook = { ...book, isEditing: true };
    onEdit(updatedBook);
  }

  async function handleDelete(e) {
    e.preventDefault();

    const result = await handleDeleteEntity(deleteBook, book.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.BOOK.deleted);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <BookDetailsTable
        book={book}
        onClose={onClose}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
      />
    </Modal>
  );
}

export default BookDetails;
