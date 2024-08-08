import { DEFAULT } from '../../../../../config/common/constants';
import { useDispatch } from 'react-redux';
import { useDeleteBookMutation } from '../../api/booksApiSlice';
import { apiSlice } from '../../../../../app/api/apiSlice';
import { handleDeleteEntityList } from '../../../../utils/formUtils';
import { TOAST } from '../../../../../config/common/messages';
import { truncateText } from '../../../../utils/utils';
import {
  TableCell,
  TableCellActions,
} from '../../../../../components/common/TableComponents';

function formatCategories(categories) {
  return categories.join(DEFAULT.commaSpace);
}

function BookTable({ book, onEdit }) {
  const [deleteBook] = useDeleteBookMutation();
  const dispatch = useDispatch();
  const bookCategoryList = formatCategories(book.categories);

  const truncatedDescription = truncateText(book.description, 298);

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteBook, book.id, TOAST.SUCCESS.BOOK.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Book', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell className='book__title' content={book.title} />
      <TableCell className='book__description' content={truncatedDescription} />
      <TableCell className='book__categories' content={bookCategoryList} />

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
