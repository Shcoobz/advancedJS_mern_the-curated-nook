import { TABLE } from '../../../../config/common/constants';
import Spinner from '../../../../components/common/Spinner';
import User from '../User/User';
import { useGetUsersQuery } from '../../api/usersApiSlice';
import { UI } from '../../../../config/common/messages';
import { useState } from 'react';
import EditUserForm from '../EditUser/EditUserForm';

function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  let content;

  function openModal(user) {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedUser(null);
  }

  if (isLoading) return <Spinner />;

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} onEdit={openModal} />)
      : null;

    content = (
      <div>
        <p className='table-description'>{UI.BS.PAGE.USER.list.paragraph}</p>
        <br />
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
        {selectedUser && (
          <EditUserForm user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    );
  }

  return content;
}

export default UsersList;
