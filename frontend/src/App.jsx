import { Routes, Route } from 'react-router-dom';
import Layout from '../src/components/Layout';
import Public from '../src/components/Public';
import Login from '../src/features/auth/components/Login';
import BackstageLayout from '../src/components/backstage/BackstageLayout';
import Welcome from '../src/features/auth/components/Welcome';
import BooksList from './features/inventory/books/BooksList';
import UsersList from '../src/features/users/UsersList';
import ToniesList from './features/inventory/tonies/ToniesList';
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

          <Route path={PATH.books}>
            <Route index element={<BooksList />} />
          </Route>

          <Route path={PATH.users}>
            <Route index element={<UsersList />} />
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
