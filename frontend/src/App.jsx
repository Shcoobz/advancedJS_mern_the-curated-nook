import { Routes, Route } from 'react-router-dom';
import Layout from '../src/components/Layout';
import Public from '../src/components/Public';
import Login from '../src/features/auth/components/Login';
import BackstageLayout from '../src/components/backstage/BackstageLayout';
import Welcome from '../src/features/auth/components/Welcome';
import NotesList from '../src/features/books/BooksList';
import UsersList from '../src/features/users/UsersList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route path='backstage' element={<BackstageLayout />}>
          <Route index element={<Welcome />} />

          <Route path='notes'>
            <Route index element={<NotesList />} />
          </Route>

          <Route path='users'>
            <Route index element={<UsersList />} />
          </Route>
        </Route>
        {/* End Backstage */}
      </Route>
    </Routes>
  );
}

export default App;
