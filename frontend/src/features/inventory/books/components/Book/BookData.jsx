import { useGetBooksQuery } from '../../api/booksApiSlice';
import { useGetBooksOnWishlistQuery } from '../../api/booksWishlistApiSlice';
import BookTable from './BookTable';

function BookData({ bookId, onEdit, index, isWishlist }) {
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

export default BookData;
