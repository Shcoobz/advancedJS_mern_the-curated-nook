import {
  TableItemDetail,
  TableItemDetailHeader,
  TableItemDetailImage,
} from '../../../../../components/common/TableComponents';
import stockImageBook from '../../../../../img/stockimageBook.png';
import { formatDate } from '../../../../utils/utils';

function BookDetailsTable({ book, onClose, handleEditClick, handleDelete }) {
  const displayDate = formatDate(book.publishedDate);

  const hasValidImageUrl = book.imageUrl && book.imageUrl !== 'N/A';
  const hasValidThumbnailUrl = book.thumbnailUrl && book.thumbnailUrl !== 'N/A';

  const imageUrl = hasValidImageUrl
    ? book.imageUrl
    : hasValidThumbnailUrl
    ? book.thumbnailUrl
    : stockImageBook;

  const tableContent = (
    <div className='book__modal-container'>
      <TableItemDetailHeader
        title={`Book: ${book.title}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='book__modal-content'>
        <div className='book__modal-image'>
          <TableItemDetailImage
            src={imageUrl}
            alt={`Cover of ${book.title}`}
            title={`Cover Image of ${book.title}`}
            className='book__cover-image'
          />
        </div>

        <div className='book__modal-info'>
          <div className='book__modal-details'>
            <TableItemDetail label='Author(s):' value={book?.authors} />
            <TableItemDetail label='Publisher:' value={book?.publisher} />
            <TableItemDetail label='Published Date:' value={displayDate} />
            <TableItemDetail label='Categories:' value={book?.categories} />
            <TableItemDetail label='Language:' value={book?.language} />
          </div>
        </div>
      </div>
      <div className='book__modal-description'>
        <TableItemDetail label='Description:' value={book?.description} />
      </div>
    </div>
  );

  return tableContent;
}

export default BookDetailsTable;
