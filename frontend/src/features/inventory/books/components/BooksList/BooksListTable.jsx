import { CreateButton } from '../../../../../components/common/Buttons';
import { UI } from '../../../../../config/common/messages';
import Book from '../Book/Book';

function BooksListTable({ books, openModal }) {
  const { ids, entities } = books;

  console.log('Book details received in List: ', books);

  const tableContent = ids?.length
    ? ids.map((bookId) => {
        const book = entities[bookId];

        return (
          <tr
            key={bookId}
            onClick={() => openModal(book)}
            className={'table__row book'}
            style={{ cursor: 'pointer' }}>
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
      <br />

      <p className='table-description'>{UI.BS.PAGE.BOOK.list.paragraph}</p>
      <br />
      <table className='table table--books'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th book__published-date'>
              Published Date
            </th>
            <th scope='col' className='table__th book__title'>
              Title
            </th>
            <th scope='col' className='table__th book__description'>
              Description
            </th>
            <th scope='col' className='table__th book__categories'>
              Categories
            </th>
            <th scope='col' className='table__th book__isbn'>
              ISBN
            </th>
            <th scope='col' className='table__th book__action'>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}

export default BooksListTable;
