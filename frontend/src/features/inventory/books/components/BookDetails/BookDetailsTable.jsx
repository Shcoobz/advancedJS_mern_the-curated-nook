import DetailItemHeader from '../../../../../components/table/DetailItemHeader';
import DetailItem from '../../../../../components/table/DetailItem';

function BookDetailsTable({ book, onClose, handleEditClick, handleDelete }) {
  return (
    <>
      <DetailItemHeader
        title={`Book Details: ${book.title}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='details'>
        <DetailItem label='Title:' value={book?.title} />
        <DetailItem label='Author(s):' value={book?.authors} />
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
