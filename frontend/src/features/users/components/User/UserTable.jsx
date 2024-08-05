import { useDispatch } from 'react-redux';
import {
  TableCell,
  TableCellActions,
} from '../../../../components/common/TableComponents';
import { DEFAULT } from '../../../../config/common/constants';
import { useDeleteUserMutation } from '../../api/usersApiSlice';
import { apiSlice } from '../../../../app/api/apiSlice';
import { handleDeleteEntityList } from '../../../utils/formUtils';
import { TOAST } from '../../../../config/common/messages';

function formatRoles(roles) {
  return roles.toString().replaceAll(DEFAULT.comma, DEFAULT.commaSpace);
}

function getCellStatus(userActive) {
  return userActive ? DEFAULT.emptyString : 'table__cell--inactive';
}

function UserTable({ user, onEdit }) {
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const userRolesString = formatRoles(user.roles);
  const cellStatus = getCellStatus(user.active);

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteUser, user.id, TOAST.SUCCESS.USER.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'User', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell
        className='user__username'
        content={user.username}
        statusClass={cellStatus}
      />
      <TableCell
        className='user_roles'
        content={userRolesString}
        statusClass={cellStatus}
      />

      <TableCellActions
        onEdit={onEdit}
        handleDelete={handleDelete}
        item={user}
        statusClass={cellStatus}
        className={'list__actions'}
      />
    </>
  );
}

export default UserTable;
