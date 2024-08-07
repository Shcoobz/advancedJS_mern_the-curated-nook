import {
  TableItemDetail,
  TableItemDetailHeader,
} from '../../../../../components/common/TableComponents';
import { isUUID } from '../../../../utils/formUtils';

import stockImageBook from '../../../../../img/stockimageBook.png';

function BookDetailsTable({ book, onClose, handleEditClick, handleDelete }) {
  const displayIsbn = isUUID(book.isbn) ? 'N/A' : book.isbn;
  const displayDate = book.publishedDate === '1900-01-01' ? 'N/A' : book.publishedDate;

  const imageUrl =
    book.imageUrl && book.imageUrl !== 'N/A'
      ? book.imageUrl
      : book.thumbnailUrl && book.thumbnailUrl !== 'N/A'
      ? book.thumbnailUrl
      : stockImageBook;

  const tableContent = (
    <>
      <TableItemDetailHeader
        title={`Book Details: ${book.title}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='details'>
        <TableItemDetail
          value={
            <img
              src={imageUrl}
              alt={`Cover of ${book.title}`}
              style={{ width: '100px', height: 'auto' }}
            />
          }
        />
        <TableItemDetail label='Title:' value={book?.title} />
        <TableItemDetail label='Author(s):' value={book?.authors} />
        <TableItemDetail label='Publisher:' value={book?.publisher} />
        <TableItemDetail label='Published Date:' value={displayDate} />
        <TableItemDetail label='Description:' value={book?.description} />
        <TableItemDetail label='ISBN:' value={displayIsbn} />
        <TableItemDetail label='Categories:' value={book?.categories} />
        <TableItemDetail label='Thumbnail URL:' value={book?.thumbnailUrl} />
        <TableItemDetail label='Image URL:' value={book?.imageUrl} />
        <TableItemDetail label='Language:' value={book?.language} />
        <TableItemDetail label='On Wishlist:' value={book?.isOnWishlist ? 'Yes' : 'No'} />
      </div>
    </>
  );

  return tableContent;
}

export default BookDetailsTable;
