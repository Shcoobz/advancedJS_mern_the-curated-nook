import { Routes, Route, useNavigate } from 'react-router-dom';
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
import PersistLogin from './features/auth/components/PersistLogin';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ROLE } from './config/common/constants';
import RequireAuth from './features/auth/components/RequireAuth';
import { useSelector } from 'react-redux';
import useTitle from './hooks/useTitle';

function App() {
  useTitle('The Curated Nook');

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    function checkMessages() {
      const logoutMessage = sessionStorage.getItem('logoutSuccess');

      if (logoutMessage) {
        toast.success(logoutMessage);
        sessionStorage.removeItem('logoutSuccess');
      }

      const authFailedMessage = sessionStorage.getItem('authFailed');

      if (authFailedMessage) {
        toast.error(authFailedMessage);
        sessionStorage.removeItem('authFailed');

        navigate('/');
      }
    }

    checkMessages();

    const intervalId = setInterval(checkMessages, 500);

    return () => clearInterval(intervalId);
  }, [auth, navigate]);

  return (
    <Routes>
      <Route path={PATH.root} element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path={PATH.login} element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLE)]} />}>
            <Route element={<Prefetch />}>
              <Route path={PATH.backstage} element={<BackstageLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={<RequireAuth allowedRoles={(ROLE.superuser, ROLE.admin)} />}>
                  <Route path={PATH.users}>
                    <Route index element={<UsersList />} />
                    <Route path='new' element={<UserFormNew />} />
                    <Route path=':id' element={<UserEdit />} />
                  </Route>
                </Route>

                <Route path={PATH.books}>
                  <Route index element={<BooksList />} />
                  <Route path='wishlist' element={<BookWishlist />} />

                  <Route path=':id' element={<BookEdit />} />
                  <Route path='new' element={<BookFormNew />} />
                </Route>

                <Route path={PATH.tonies}>
                  <Route index element={<ToniesList />} />
                  <Route path='wishlist' element={<TonieWishlist />} />

                  <Route path='new' element={<TonieFormNew />} />
                  <Route path=':id' element={<TonieEdit />} />
                </Route>

                <Route path={PATH.lego}>
                  <Route index element={<LegoList />} />
                  <Route path='wishlist' element={<LegoWishlist />} />

                  <Route path='new' element={<LegoNewForm />} />
                  <Route path=':id' element={<LegoEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
