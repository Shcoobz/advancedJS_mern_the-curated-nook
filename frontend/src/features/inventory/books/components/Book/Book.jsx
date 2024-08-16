import { useSelector } from 'react-redux';
import { selectBookById } from '../../api/booksApiSlice';
import BookTable from './BookTable';

function Book({ bookId, onEdit, index }) {
  const book = useSelector((state) => selectBookById(state, bookId));

  if (!book) return null;

  const content = <BookTable book={book} onEdit={onEdit} index={index} />;

  return content;
}

export default Book;
