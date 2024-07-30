import { useState } from 'react';
import { useGetUsersQuery } from '../../api/usersApiSlice';
import Spinner from '../../../../components/common/Spinner';
import EditUserForm from '../EditUser/EditUserForm';
import NewUserForm from '../NewUser/NewUserForm';
import UsersListTable from './UsersListTable';

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

  function openModal(user = null) {
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
    content = <UsersListTable ids={users.ids} openModal={openModal} />;
  }

  const usersList = (
    <>
      {content}
      {isModalOpen &&
        (selectedUser ? (
          <EditUserForm user={selectedUser} isOpen={isModalOpen} onClose={closeModal} />
        ) : (
          <NewUserForm isOpen={isModalOpen} onClose={closeModal} />
        ))}
    </>
  );

  return usersList;
}

export default UsersList;
