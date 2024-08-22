import { useGetUsersQuery } from '../../api/usersApiSlice';
import UserTable from './UserTable';

function User({ userId, onEdit, index }) {
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  if (!user) return null;

  const content = <UserTable user={user} onEdit={onEdit} index={index} />;

  return content;
}

export default User;
