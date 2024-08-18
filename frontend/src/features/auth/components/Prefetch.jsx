import { useEffect } from 'react';
import { store } from '../../../app/store';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../../users/api/usersApiSlice';
import { booksApiSlice } from '../../inventory/books/api/booksApiSlice';
import { legoApiSlice } from '../../inventory/lego/api/legoApiSlice';
import { toniesApiSlice } from '../../inventory/tonies/api/toniesApiSlice';
import { booksWishlistApiSlice } from '../../inventory/books/api/booksWishlistApiSlice';
import { legoWishlistApiSlice } from '../../inventory/lego/api/legoWishlistApiSlice';
import { toniesWishlistApiSlice } from '../../inventory/tonies/api/tonieWishlistApiSlice';

function Prefetch() {
  useEffect(() => {
    console.log('Prefetch: subscribing');

    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const books = store.dispatch(booksApiSlice.endpoints.getBooks.initiate());
    const lego = store.dispatch(legoApiSlice.endpoints.getLego.initiate());
    const tonies = store.dispatch(toniesApiSlice.endpoints.getTonies.initiate());

    const wishlistBooks = store.dispatch(
      booksWishlistApiSlice.endpoints.getBooksOnWishlist.initiate()
    );
    const wishlistLego = store.dispatch(
      legoWishlistApiSlice.endpoints.getLegoOnWishlist.initiate()
    );
    const wishlistTonies = store.dispatch(
      toniesWishlistApiSlice.endpoints.getToniesOnWishlist.initiate()
    );

    return () => {
      console.log('Prefetch: unsubscribing');

      users.unsubscribe();
      books.unsubscribe();
      lego.unsubscribe();
      tonies.unsubscribe();

      wishlistBooks.unsubscribe();
      wishlistLego.unsubscribe();
      wishlistTonies.unsubscribe();
    };
  }, []);

  return <Outlet />;
}

export default Prefetch;
