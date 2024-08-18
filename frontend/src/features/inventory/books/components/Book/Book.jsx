import { useSelector } from 'react-redux';
import { selectBookById } from '../../api/booksApiSlice';
import BookTable from './BookTable';
import { selectWishlistBookById } from '../../api/booksWishlistApiSlice';

function Book({ bookId, onEdit, index, isWishlist = false }) {
  const selectBook = isWishlist ? selectWishlistBookById : selectBookById;

  const book = useSelector((state) => {
    const selected = selectBook(state, bookId);

    return selected;
  });

  if (!book) return null;

  const content = <BookTable book={book} onEdit={onEdit} index={index} />;

  return content;
}

export default Book;
