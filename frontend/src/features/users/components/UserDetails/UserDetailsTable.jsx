import {
  TableItemDetail,
  TableItemDetailHeader,
} from '../../../../components/common/TableComponents';

function UserDetailsTable({ user, onClose, handleEditClick, handleDelete }) {
  const tableContent = (
    <>
      <TableItemDetailHeader
        title={`User Details: ${user?.username}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <TableItemDetail label='Username:' value={user?.username} />
      <TableItemDetail label='Roles:' value={user?.roles} />
      <TableItemDetail label='Active:' value={user?.active ? 'Yes' : 'No'} />
    </>
  );

  return tableContent;
}

export default UserDetailsTable;
