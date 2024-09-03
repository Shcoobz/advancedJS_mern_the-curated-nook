import { useGetUsersQuery } from '../../api/usersApiSlice';
import UserFormEdit from '../UserEdit/UserFormEdit';
import UserFormNew from '../UserNew/UserFormNew';
import UsersListTable from './UsersListTable';
import UserDetails from '../UserDetails/UserDetails';
import EntityList from '../../../entity/components/EntityList/EntityList';

function UsersList() {
  return (
    <EntityList
      entityName='user'
      useGetQuery={useGetUsersQuery}
      ListTable={UsersListTable}
      FormEdit={UserFormEdit}
      FormNew={UserFormNew}
      Details={UserDetails}
    />
  );
}

export default UsersList;
