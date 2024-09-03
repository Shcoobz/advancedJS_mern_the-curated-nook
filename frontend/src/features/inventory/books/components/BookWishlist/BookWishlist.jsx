import { useGetBooksOnWishlistQuery } from '../../api/booksWishlistApiSlice';
import BookWishlistTable from './BookWishlistTable';
import BookFormEdit from '../BookEdit/BookFormEdit';
import BookDetails from '../BookDetails/BookDetails';
import BookFormNew from '../BookNew/BookFormNew';
import EntityWishlist from '../../../../entity/components/EntityWishlist/EntityWishlist';

function BookWishlist() {
  return (
    <EntityWishlist
      entityName='Book'
      useGetWishlistQuery={useGetBooksOnWishlistQuery}
      WishlistTable={BookWishlistTable}
      FormEdit={BookFormEdit}
      FormNew={BookFormNew}
      Details={BookDetails}
    />
  );
}

export default BookWishlist;
