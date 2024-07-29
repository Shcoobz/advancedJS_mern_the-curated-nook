import { Routes, Route } from 'react-router-dom';
import Layout from '../src/components/Layout';
import Public from '../src/components/Public';
import Login from '../src/features/auth/components/Login';
import BackstageLayout from '../src/components/backstage/BackstageLayout';
import Welcome from '../src/features/auth/components/Welcome';

import UsersList from './features/users/components/UsersList/UsersList';
import NewUserFormModal from './features/users/components/NewUser/NewUserFormModal';
import EditUser from './features/users/components/EditUser/EditUser';

import BooksList from './features/inventory/books/components/BooksList/BooksList';
import NewBook from './features/inventory/books/components/NewBook/NewBookForm';
import EditBook from './features/inventory/books/components/EditBook/EditBook';

import ToniesList from './features/inventory/tonies/ToniesList/ToniesList';
import LegoList from './features/inventory/lego/LegoList';

import { PATH } from './config/common/constants';

function App() {
  return (
    <Routes>
      <Route path={PATH.root} element={<Layout />}>
        <Route index element={<Public />} />
        <Route path={PATH.login} element={<Login />} />

        <Route path={PATH.backstage} element={<BackstageLayout />}>
          <Route index element={<Welcome />} />

          <Route path={PATH.users}>
            <Route index element={<UsersList />} />
            <Route path='new' element={<NewUserFormModal />} />
            <Route path=':id' element={<EditUser />} />
          </Route>

          <Route path={PATH.books}>
            <Route index element={<BooksList />} />
            <Route path='new' element={<NewBook />} />
            <Route path=':id' element={<EditBook />} />
          </Route>

          <Route path={PATH.tonies}>
            <Route index element={<ToniesList />} />
          </Route>

          <Route path={PATH.lego}>
            <Route index element={<LegoList />} />
          </Route>
        </Route>
        {/* End Backstage */}
      </Route>
    </Routes>
  );
}

export default App;
