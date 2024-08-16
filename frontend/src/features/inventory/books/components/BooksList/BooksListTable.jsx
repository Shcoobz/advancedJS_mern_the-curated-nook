import { UI } from '../../../../../config/common/messages';
import {
  TableCellHeader,
  TableAboveHeader,
} from '../../../../../components/common/TableComponents';
import { generateTableContent, genericFilter } from '../../../../utils/utils';
import Book from '../Book/Book';
import { useMemo, useState } from 'react';
import SearchInput from '../../../../../components/common/SearchInput';
import NoResults from '../../../../../components/common/NoResults';

function BooksListTable({ books, openModal }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = useMemo(
    () => genericFilter({ fields: ['title', 'categories'] }, books, searchTerm),
    [books, searchTerm]
  );

  const { ids, entities } = filteredBooks;

  const tableContent = generateTableContent(ids, entities, openModal, Book, 'book');

  return (
    <div>
      <SearchInput setSearchTerm={setSearchTerm} searchType='Books' />

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
      {ids.length === 0 && <NoResults />}
    </div>
  );
}

export default BooksListTable;
