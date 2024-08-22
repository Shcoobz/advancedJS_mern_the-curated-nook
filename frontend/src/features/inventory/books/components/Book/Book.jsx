import { useGetBooksQuery } from '../../api/booksApiSlice';
import BookTable from './BookTable';
import { useGetBooksOnWishlistQuery } from '../../api/booksWishlistApiSlice';

function Book({ bookId, onEdit, index, isWishlist = false }) {
  const { book: inventoryBook } = useGetBooksQuery('booksList', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[bookId],
    }),
  });

  const { book: wishlistBook } = useGetBooksOnWishlistQuery('wishlistBooks', {
    selectFromResult: ({ data }) => ({
      book: data?.entities[bookId],
    }),
  });

  const book = isWishlist ? wishlistBook : inventoryBook;

  if (!book) return null;

  const content = <BookTable book={book} onEdit={onEdit} index={index} />;

  return content;
}

export default Book;
