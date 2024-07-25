import { Routes, Route } from 'react-router-dom';
import { PATH } from './config/common/constants';

import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/components/Login';
import BackstageLayout from './components/backstage/BackstageLayout';
import Welcome from './features/auth/components/Welcome';
import BooksList from './features/books/BooksList';
import UsersList from './features/users/UsersList';

function App() {
  return (
    <Routes>
      <Route path={PATH.root} element={<Layout />}>
        <Route index element={<Public />} />
        <Route path={PATH.login} element={<Login />} />

        {/* protected routes */}
        <Route path={PATH.backstage} element={<BackstageLayout />}>
          <Route index element={<Welcome />} />

          <Route path={PATH.books}>
            <Route index element={<BooksList />} />
          </Route>

          <Route path={PATH.users}>
            <Route index element={<UsersList />} />
          </Route>
        </Route>
        {/* end protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
