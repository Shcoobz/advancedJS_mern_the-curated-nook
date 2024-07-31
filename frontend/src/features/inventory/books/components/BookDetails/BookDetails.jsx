import { toast } from 'react-toastify';
import { useDeleteBookMutation } from '../../api/booksApiSlice';
import { handleDeleteBook } from '../bookUtils';
import { TOAST } from '../../../../../config/common/messages';
import Modal from '../../../../../components/common/Modal';
import {
  DeleteButton,
  EditButton,
  CloseButton,
} from '../../../../../components/common/Buttons';

function BookDetails({ book, isOpen, onClose, onEdit }) {
  const [deleteBook] = useDeleteBookMutation();

  console.log('Book details received in component:', book);

  if (!book) return null;

  function handleEditClick() {
    const updatedBook = { ...book, isEditing: true };
    onEdit(updatedBook);
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

  const content = (
    <>
      <div className='details-header__container'>
        <h2>Book Details: {book.title}</h2>
        <div className='details-header__action-buttons'>
          <EditButton onClick={handleEditClick} />
          <DeleteButton handleDelete={handleDelete} />
          <CloseButton onClick={onClose} />
        </div>
      </div>
      <div className='details'>
        <div className='details__group'>
          <label className='details__label' htmlFor='title'>
            Title:
          </label>
          <p className='details__book'>{book?.title}</p>
        </div>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='authors'>
          Authors:
        </label>
        <p className='details__book'>{book?.authors}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='publisher'>
          Publisher:
        </label>
        <p className='details__book'>{book?.publisher}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='publishedDate'>
          Published Date:
        </label>
        <p className='details__book'>{book?.publishedDate}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='description'>
          Description:
        </label>
        <p className='details__book'>{book?.description}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='isbn'>
          ISBN:
        </label>
        <p className='details__book'>{book?.isbn.join(', ')}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='categories'>
          Categories:
        </label>
        <p className='details__book'>{book?.categories.join(', ')}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='thumbnailUrl'>
          Thumbnail URL:
        </label>
        <p className='details__book'>{book?.thumbnailUrl}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='imageUrl'>
          Image URL:
        </label>
        <p className='details__book'>{book?.imageUrl}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='language'>
          Language:
        </label>
        <p className='details__book'>{book?.language}</p>
      </div>
      <div className='details__group'>
        <label className='details__label' htmlFor='isOnWishlist'>
          On Wishlist:
        </label>
        <p className='details__book'>{book?.isOnWishlist ? 'Yes' : 'No'}</p>
      </div>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {content}
    </Modal>
  );
}

export default BookDetails;
