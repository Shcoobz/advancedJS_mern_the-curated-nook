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
import stockImageBook from '../../../../../img/stockimageBook.png';
import useAuth from '../../../../../hooks/useAuth';

function formatCategories(categories) {
  return categories.join(DEFAULT.commaSpace);
}

function BookTable({ item, onEdit, index }) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = isSuperuser || isAdmin;

  const [deleteBook] = useDeleteBookMutation();
  const dispatch = useDispatch();

  const bookCategoryList = formatCategories(item.categories);
  const truncatedDescription = truncateText(item.description, 298);
  const thumbnailUrl =
    item.thumbnailUrl && item.thumbnailUrl !== 'N/A' ? item.thumbnailUrl : stockImageBook;

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteBook, item.id, TOAST.SUCCESS.BOOK.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'Book', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell className='table__cell item__number' content={index} />
      <TableCell
        className='table__cell user__thumbnail-cell'
        content={<img src={thumbnailUrl} alt={item.title || 'Book'} />}
      />

      <TableCell className='book__title' content={item.title} />
      <TableCell className='book__description' content={truncatedDescription} />
      <TableCell className='book__categories' content={bookCategoryList} />

      {isProtected && (
        <TableCellActions
          onEdit={onEdit}
          handleDelete={handleDelete}
          item={item}
          className='list__actions'
        />
      )}
    </>
  );
}

export default BookTable;
