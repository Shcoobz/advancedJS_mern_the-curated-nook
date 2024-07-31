import DetailItem from '../../../../../components/table/DetailItem';
import {
  CloseButton,
  DeleteButton,
  EditButton,
} from '../../../../../components/common/Buttons';

function BookDetailsTable({ book, onClose, handleEditClick, handleDelete }) {
  return (
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
        <DetailItem label='Title:' value={book?.title} />
        <DetailItem label='Authors:' value={book?.authors} />
        <DetailItem label='Publisher:' value={book?.publisher} />
        <DetailItem label='Published Date:' value={book?.publishedDate} />
        <DetailItem label='Description:' value={book?.description} />
        <DetailItem label='ISBN:' value={book?.isbn} />
        <DetailItem label='Categories:' value={book?.categories} />
        <DetailItem label='Thumbnail URL:' value={book?.thumbnailUrl} />
        <DetailItem label='Image URL:' value={book?.imageUrl} />
        <DetailItem label='Language:' value={book?.language} />
        <DetailItem label='On Wishlist:' value={book?.isOnWishlist ? 'Yes' : 'No'} />
      </div>
    </>
  );
}

export default BookDetailsTable;
