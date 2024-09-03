import createEntityData from '../../../../entity/components/Entity/createEntityData';
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
