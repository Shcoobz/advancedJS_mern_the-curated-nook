import { DEFAULT } from '../../../../../config/common/constants';
import {
  TableCell,
  TableCellActions,
} from '../../../../../components/common/TableComponents';
import { useDispatch } from 'react-redux';
import { useDeleteBookMutation } from '../../api/booksApiSlice';
import { handleDeleteBookList } from '../bookUtils';
import { apiSlice } from '../../../../../app/api/apiSlice';

function formatCategories(categories) {
  return categories.join(DEFAULT.commaSpace);
}

function BookTable({ book, onEdit }) {
  const [deleteBook] = useDeleteBookMutation();
  const dispatch = useDispatch();
  const bookCategoryList = formatCategories(book.categories);

  async function handleDelete(e) {
    await handleDeleteBookList(deleteBook, book.id);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Book', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell
        className='book__published-date hidden-col'
        content={book.publishedDate}
      />
      <TableCell className='book__title' content={book.title} />
      <TableCell className='book__description' content={book.description} />
      <TableCell className='book__categories' content={bookCategoryList} />
      <TableCell className='book__isbn hidden-col' content={book.isbn} />

      <TableCellActions
        onEdit={onEdit}
        handleDelete={handleDelete}
        item={book}
        className='list__actions'
      />
    </>
  );
}

export default BookTable;
