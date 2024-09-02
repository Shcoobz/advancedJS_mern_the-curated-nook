import createEntityData from '../../../../entity/Components/entity/createEntityData';
import { useGetBooksQuery } from '../../api/booksApiSlice';
import { useGetBooksOnWishlistQuery } from '../../api/booksWishlistApiSlice';
import BookTable from './BookTable';

const BookData = createEntityData(
  useGetBooksQuery,
  useGetBooksOnWishlistQuery,
  BookTable,
  'booksList',
  'wishlistBooks'
);

export default BookData;
