import { useSelector } from 'react-redux';
import { selectBookById } from '../../api/booksApiSlice';
import BookTable from './BookTable';

function Book({ bookId, onEdit }) {
  const book = useSelector((state) => selectBookById(state, bookId));

  if (!book) return null;

  const content = <BookTable book={book} onEdit={onEdit} />;

  return content;
}

export default Book;
