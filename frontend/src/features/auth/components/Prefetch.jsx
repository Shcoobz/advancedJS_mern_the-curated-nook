import { useEffect } from 'react';
import { store } from '../../../app/store';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../../users/api/usersApiSlice';
import { booksApiSlice } from '../../inventory/books/api/booksApiSlice';
import { legoApiSlice } from '../../inventory/lego/api/legoApiSlice';
import { toniesApiSlice } from '../../inventory/tonies/api/toniesApiSlice';

function Prefetch() {
  useEffect(() => {
    console.log('Prefetch: subscribing');

    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const books = store.dispatch(booksApiSlice.endpoints.getBooks.initiate());
    const lego = store.dispatch(legoApiSlice.endpoints.getLego.initiate());
    const tonies = store.dispatch(toniesApiSlice.endpoints.getTonies.initiate());

    return () => {
      console.log('Prefetch: unsubscribing');

      users.unsubscribe();
      books.unsubscribe();
      lego.unsubscribe();
      tonies.unsubscribe();
    };
  }, []);

  return <Outlet />;
}

export default Prefetch;
