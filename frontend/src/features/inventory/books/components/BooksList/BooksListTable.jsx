import { UI } from '../../../../../config/common/messages';
import { TableCellHeader } from '../../../../../components/common/TableComponents';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import { useMemo } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ConditionalList from '../../../../../components/common/ConditionalList';
import { LINK } from '../../../../../config/common/constants';
import useAuth from '../../../../../hooks/useAuth';
import MemoizedEntity from '../../../../entity/Components/entity/MemoizedEntity';

function BooksListTable({ books, openModal }) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = isSuperuser || isAdmin;
  const navigate = useNavigate();
  const { searchTerm } = useOutletContext();

  const filteredBooks = useMemo(
    () => genericFilter({ fields: ['title', 'categories'] }, books, searchTerm),
    [books, searchTerm]
  );

  const { ids, entities } = filteredBooks;

  const tableClass = isProtected
    ? 'table__books--with-actions'
    : 'table__books--without-actions';

  // const tableContent = generateTableContent(ids, entities, openModal, Book, 'book');

  const tableContent = generateTableContent(
    ids,
    entities,
    openModal,
    MemoizedEntity,
    'book'
  );

  const bookTable = ids.length > 0 && (
    <table className={`table ${tableClass}`}>
      <thead className='table__thead'>
        <tr>
          <TableCellHeader label='No.' className='book__number' />
          <TableCellHeader label='Image' className='book__thumbnail' />
          <TableCellHeader label='Title' className='book__title' />
          <TableCellHeader label='Description' className='book__description' />
          <TableCellHeader label='Categories' className='book__categories' />

          {isProtected && <TableCellHeader label='Edit' className='book__action' />}
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

  function handleWishlistClick() {
    navigate(LINK.BOOK.wishlist);
  }

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.BOOK.list.paragraph}
      onCreateClick={() => openModal()}
      onWishlistClick={handleWishlistClick}
      table={bookTable}
      createButtonText='New Book'
      isProtected={isProtected}
    />
  );
}

export default BooksListTable;
