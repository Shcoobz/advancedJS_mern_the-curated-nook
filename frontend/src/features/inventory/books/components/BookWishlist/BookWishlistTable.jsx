import { useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import Book from '../Book/Book';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import { LINK } from '../../../../../config/common/constants';
import ConditionalList from '../../../../../components/common/ConditionalList';
import { UI } from '../../../../../config/common/messages';

function BookWishlistTable({ books, openModal }) {
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  const filteredBooks = useMemo(
    () => genericFilter({ fields: ['title', 'categories'] }, books, searchTerm),
    [books, searchTerm]
  );

  const { ids, entities } = filteredBooks;

  const tableContent = generateTableContent(ids, entities, openModal, Book, 'book', true);

  const bookWishlistTable = ids.length > 0 && (
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

  function handleHomeClick() {
    navigate(LINK.BOOK.viewBooks);
  }

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.BOOK.list.paragraph}
      onCreateClick={() => openModal()}
      onHomeClick={handleHomeClick}
      table={bookWishlistTable}
      createButtonText='New Book'
    />
  );
}

export default BookWishlistTable;
