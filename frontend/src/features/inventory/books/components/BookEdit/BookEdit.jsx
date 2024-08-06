import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBookById } from '../../api/booksApiSlice';

import Spinner from '../../../../../components/common/Spinner';
import BookFormEdit from './BookFormEdit';

function BookEdit() {
  const { id } = useParams();

  const book = useSelector((state) => selectBookById(state, id));

  const content = book ? <BookFormEdit book={book} /> : <Spinner />;

  return content;
}

export default BookEdit;
