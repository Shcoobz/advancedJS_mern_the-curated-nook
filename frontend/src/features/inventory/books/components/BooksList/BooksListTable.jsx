import { UI } from '../../../../../config/common/messages';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import Book from '../Book/Book';
import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import ConditionalList from '../../../../../components/common/ConditionalList';

function BooksListTable({ books, openModal }) {
  const { searchTerm } = useOutletContext();

  const filteredBooks = useMemo(
    () => genericFilter({ fields: ['title', 'categories'] }, books, searchTerm),
    [books, searchTerm]
  );

  const { ids, entities } = filteredBooks;

  const tableContent = generateTableContent(ids, entities, openModal, Book, 'book');

  const bookTable = ids.length > 0 && (
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
  );

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.BOOK.list.paragraph}
      onCreateClick={() => openModal()}
      onWishlistClick={undefined}
      table={bookTable}
      createButtonText='New User'
    />
  );
}

export default BooksListTable;
