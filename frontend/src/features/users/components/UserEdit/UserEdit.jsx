import { useGetUsersQuery } from '../../api/usersApiSlice';
import UserFormEdit from './UserFormEdit';
import EntityEdit from '../../../entity/components/EntityEdit/EntityEdit';

function UserEdit() {
  return (
    <EntityEdit
      useGetQuery={useGetUsersQuery}
      queryName='usersList'
      EntityFormEdit={UserFormEdit}
      entityName='user'
    />
  );
}

export default UserEdit;
