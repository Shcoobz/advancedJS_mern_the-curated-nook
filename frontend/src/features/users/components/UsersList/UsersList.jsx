import { API, TABLE } from '../../../../config/common/constants';
import Spinner from '../../../../components/common/Spinner';
import User from '../User/User';
import { useGetUsersQuery } from '../../api/usersApiSlice';

function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(API.CACHE_KEY.usersList, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className='table table--users'>
        <thead className='table__thead'>
          <tr>
            <th scope='col' className='table__th user__username'>
              {TABLE.TITLE.USER.name}
            </th>
            <th scope='col' className='table__th user__roles'>
              {TABLE.TITLE.USER.roles}
            </th>
            <th scope='col' className='table__th user__action'>
              {TABLE.TITLE.USER.action}
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
}

export default UsersList;
