import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBookById } from '../api/booksApiSlice';
import { DEFAULT } from '../../../../config/common/constants';

function createHandleEdit(navigate, bookId) {
  return function handleEdit() {
    navigate(`/backstage/books/${bookId}`);
  };
}

function formatCategories(categories) {
  return categories.join(DEFAULT.commaSpace);
}

function Book({ bookId }) {
  const navigate = useNavigate();
  const book = useSelector((state) => selectBookById(state, bookId));
  const bookCategoryList = formatCategories(book.categories);

  if (book) {
    const handleEdit = createHandleEdit(navigate, bookId);

    return (
      <tr className='table__row book'>
        <td className={'table__cell book__published-date'}>{book.publishedDate}</td>
        <td className={'table__cell book__title'}>{book.title}</td>
        <td className={'table__cell book__description'}>{book.description}</td>
        <td className={'table__cell book__categories'}> {bookCategoryList}</td>
        <td className={'table__cell book__isbn'}>{book.isbn}</td>
        <td className={'table__cell'}>
          <button className='icon-button table__button' onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export default Book;
