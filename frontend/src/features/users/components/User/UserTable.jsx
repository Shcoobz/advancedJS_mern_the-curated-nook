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
import stockImageUser from '../../../../img/stockimageUser.png';
import useAuth from '../../../../hooks/useAuth';

function formatRoles(roles) {
  return roles.toString().replaceAll(DEFAULT.comma, DEFAULT.commaSpace);
}

function getCellStatus(userActive) {
  return userActive ? DEFAULT.emptyString : 'table__cell--inactive';
}

function UserTable({ item, onEdit, index }) {
  const { isAdmin } = useAuth();
  const isProtected = isAdmin;

  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const userRolesString = formatRoles(item.roles);
  const cellStatus = getCellStatus(item.active);

  const thumbnailUrl =
  item.thumbnailUrl && item.thumbnailUrl !== 'N/A' ? item.thumbnailUrl : stockImageUser;

  async function handleDelete(e) {
    await handleDeleteEntityList(deleteUser, item.id, TOAST.SUCCESS.USER.deleted);

    dispatch(apiSlice.util.invalidateTags([{ type: 'User', id: 'LIST' }]));
  }

  return (
    <>
      <TableCell
        className='table__cell item__number'
        content={index}
        statusClass={cellStatus}
      />
      <TableCell
        className='table__cell user__thumbnail-cell'
        content={<img src={thumbnailUrl} alt={item.username || 'User'} />}
        statusClass={cellStatus}
      />
      <TableCell
        className='user__username'
        content={item.username}
        statusClass={cellStatus}
      />
      <TableCell
        className='user_roles'
        content={userRolesString}
        statusClass={cellStatus}
      />

      {isProtected && (
        <TableCellActions
          onEdit={onEdit}
          handleDelete={handleDelete}
          item={item}
          statusClass={cellStatus}
          className={'list__actions'}
        />
      )}
    </>
  );
}

export default UserTable;
