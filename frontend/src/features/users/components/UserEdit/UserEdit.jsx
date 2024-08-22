import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../../api/usersApiSlice';

import Spinner from '../../../../components/common/Spinner';
import UserFormEdit from './UserFormEdit';

function UserEdit() {
  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <Spinner />;

  const content = <UserFormEdit user={user} />;

  return content;
}

export default UserEdit;
