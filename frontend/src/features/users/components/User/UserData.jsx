import createEntityData from '../../../entity/components/Entity/createEntityData';
import { useGetUsersQuery } from '../../api/usersApiSlice';
import UserTable from './UserTable';

const UserData = createEntityData(
  useGetUsersQuery,
  undefined,
  UserTable,
  'usersList',
  undefined
);

export default UserData;
