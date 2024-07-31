import { CreateButton } from '../../../../../components/common/Buttons';
import { UI } from '../../../../../config/common/messages';
import {
  TableCellHeader,
  TableDescription,
} from '../../../../../components/common/TableComponents';

import Book from '../Book/Book';

function BooksListTable({ books, openModal }) {
  const { ids, entities } = books;

  const tableContent = ids?.length
    ? ids.map((bookId) => {
        const book = entities[bookId];

        return (
          <tr
            key={bookId}
            onClick={() => openModal(book)}
            className={'table__row-cursor'}>
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
      <CreateButton onClick={() => openModal()} text={'New Book'} />
      <TableDescription text={UI.BS.PAGE.BOOK.list.paragraph} />

      <br />

      <table className='table table--books'>
        <thead className='table__thead'>
          <tr>
            <TableCellHeader label='Published Date' className='book__published-date' />
            <TableCellHeader label='Title' className='book__title' />
            <TableCellHeader label='Description' className='book__description' />
            <TableCellHeader label='Categories' className='book__categories' />
            <TableCellHeader label='ISBN' className='book__isbn' />
            <TableCellHeader label='Edit' className='book__action' />
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}

export default BooksListTable;
