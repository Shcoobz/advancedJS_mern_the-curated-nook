import { UI } from '../../../../../config/common/messages';
import {
  TableCellHeader,
  TableAboveHeader,
} from '../../../../../components/common/TableComponents';

import Book from '../Book/Book';
import stockImageBook from '../../../../../img/stockimageBook.png';

function BooksListTable({ books, openModal }) {
  const { ids, entities } = books;

  const tableContent = ids?.length
    ? ids.map((bookId, index) => {
        const book = entities[bookId];
        const thumbnailUrl =
          book.thumbnailUrl && book.thumbnailUrl !== 'N/A'
            ? book.thumbnailUrl
            : stockImageBook;

        return (
          <tr
            key={bookId}
            onClick={() => openModal(book)}
            className={'table__row-cursor'}>
            <td className='table__cell item__number'>{index + 1}</td>
            <td className='table__cell book__thumbnail-cell'>
              <img src={thumbnailUrl} alt={book.title} />
            </td>
            <Book
              book={book}
              bookId={bookId}
              onEdit={() => openModal({ ...book, isEditing: true })}
            />
          </tr>
        );
      })
    : null;

  return (
    <div>
      <TableAboveHeader
        descriptionText={UI.BS.PAGE.BOOK.list.paragraph}
        onCreateClick={() => openModal()}
        onWishlistClick={undefined}
      />

      <table className='table table__books'>
        <thead className='table__thead'>
          <tr>
            <TableCellHeader label='No.' className='book__number' />
            <TableCellHeader label='Image' className='book__thumbnail' />
            <TableCellHeader label='Title' className='book__title' />
            <TableCellHeader label='Description' className='book__description' />
            <TableCellHeader label='Categories' className='book__categories' />
            <TableCellHeader label='Edit' className='book__action' />
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}

export default BooksListTable;
