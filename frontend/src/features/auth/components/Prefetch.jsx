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

    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));

    store.dispatch(booksApiSlice.util.prefetch('getBooks', 'booksList', { force: true }));
    store.dispatch(
      booksWishlistApiSlice.util.prefetch('getBooksOnWishlist', 'wishlistBook', {
        force: true,
      })
    );

    store.dispatch(legoApiSlice.util.prefetch('getLego', 'legoList', { force: true }));
    store.dispatch(
      legoWishlistApiSlice.util.prefetch('getLegoOnWishlist', 'wishlistLego', {
        force: true,
      })
    );

    store.dispatch(
      toniesApiSlice.util.prefetch('getTonies', 'toniesList', { force: true })
    );
    store.dispatch(
      toniesWishlistApiSlice.util.prefetch('getToniesOnWishlist', 'wishlistTonie', {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
}

export default Prefetch;
