import { UI } from '../../../config/common/messages';
import { CreateButton } from '../../common/Buttons';
import Book from '../../../features/inventory/books/components/Book/Book';

function BooksListTable({ books, onEdit, openModal }) {
  const { ids } = books;

  const tableContent = ids?.length
    ? ids.map((bookId) => <Book key={bookId} bookId={bookId} onEdit={onEdit} />)
    : null;

  return (
    <div>
      <br />
      <CreateButton onClick={() => openModal()} label='Create New Book' />
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
