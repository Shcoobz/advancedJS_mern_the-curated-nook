import { useSelector } from 'react-redux';
import { selectBookById } from '../../api/booksApiSlice';
import { DEFAULT } from '../../../../../config/common/constants';
import { EditButton } from '../../../../../components/common/Buttons';

function formatCategories(categories) {
  return categories.join(DEFAULT.commaSpace);
}

function Book({ bookId, onEdit }) {
  const book = useSelector((state) => selectBookById(state, bookId));

  function handleEdit() {
    onEdit(book);
  }

  if (book) {
    const bookCategoryList = formatCategories(book.categories);

    return (
      <tr className='table__row book'>
        <td className={'table__cell book__published-date'}>{book.publishedDate}</td>
        <td className={'table__cell book__title'}>{book.title}</td>
        <td className={'table__cell book__description'}>{book.description}</td>
        <td className={'table__cell book__categories'}> {bookCategoryList}</td>
        <td className={'table__cell book__isbn'}>{book.isbn}</td>
        <td className={'table__cell'}>
          <EditButton onClick={handleEdit} />
        </td>
      </tr>
    );
  } else return null;
}

export default Book;
