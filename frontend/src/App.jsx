import { Routes, Route } from 'react-router-dom';
import { PATH } from './config/common/constants';

import Layout from '../src/components/Layout';
import Public from '../src/components/Public';
import Login from '../src/features/auth/components/Login';
import BackstageLayout from '../src/components/backstage/BackstageLayout';
import Welcome from '../src/features/auth/components/Welcome';

import UsersList from './features/users/components/UsersList/UsersList';
import UserFormNew from './features/users/components/UserNew/UserFormNew';
import UserEdit from './features/users/components/UserEdit/UserEdit';

import BooksList from './features/inventory/books/components/BooksList/BooksList';
import BookFormNew from './features/inventory/books/components/BookNew/BookFormNew';
import BookEdit from './features/inventory/books/components/BookEdit/BookEdit';
import BookWishlist from './features/inventory/books/components/BookWishlist/BookWishlist';

import ToniesList from './features/inventory/tonies/components/ToniesList/ToniesList';
import TonieFormNew from './features/inventory/tonies/components/TonieNew/TonieFormNew';
import TonieEdit from './features/inventory/tonies/components/TonieEdit/TonieEdit';
import TonieWishlist from './features/inventory/tonies/components/TonieWishlist/TonieWishlist';

import LegoList from './features/inventory/lego/components/LegoList/LegoList';
import LegoNewForm from './features/inventory/lego/components/LegoNew/LegoFormNew';
import LegoEdit from './features/inventory/lego/components/LegoEdit/LegoEdit';
import LegoWishlist from './features/inventory/lego/components/LegoWishlist/LegoWishlist';

import Prefetch from './features/auth/components/Prefetch';

function App() {
  return (
    <Routes>
      <Route path={PATH.root} element={<Layout />}>
        <Route index element={<Public />} />
        <Route path={PATH.login} element={<Login />} />

        <Route element={<Prefetch />}>
          <Route path={PATH.backstage} element={<BackstageLayout />}>
            <Route index element={<Welcome />} />

            <Route path={PATH.users}>
              <Route index element={<UsersList />} />
              <Route path='new' element={<UserFormNew />} />
              <Route path=':id' element={<UserEdit />} />
            </Route>

            <Route path={PATH.books}>
              <Route index element={<BooksList />} />
              <Route path='new' element={<BookFormNew />} />
              <Route path=':id' element={<BookEdit />} />
              <Route path='wishlist' element={<BookWishlist />} />
            </Route>

            <Route path={PATH.tonies}>
              <Route index element={<ToniesList />} />
              <Route path='new' element={<TonieFormNew />} />
              <Route path=':id' element={<TonieEdit />} />
              <Route path='wishlist' element={<TonieWishlist />} />
            </Route>

            <Route path={PATH.lego}>
              <Route index element={<LegoList />} />
              <Route path='new' element={<LegoNewForm />} />
              <Route path=':id' element={<LegoEdit />} />
              <Route path='wishlist' element={<LegoWishlist />} />
            </Route>
          </Route>
          {/* End Backstage */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
