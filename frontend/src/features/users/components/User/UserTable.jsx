import { TableCell, TableCellEdit } from '../../../../components/common/TableComponents';
import { DEFAULT } from '../../../../config/common/constants';

function formatRoles(roles) {
  return roles.toString().replaceAll(DEFAULT.comma, DEFAULT.commaSpace);
}

function getCellStatus(userActive) {
  return userActive ? DEFAULT.emptyString : 'table__cell--inactive';
}

function UserTable({ user, onEdit }) {
  const userRolesString = formatRoles(user.roles);
  const cellStatus = getCellStatus(user.active);

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

      <TableCellEdit
        onEdit={onEdit}
        item={user}
        statusClass={cellStatus}
        className={'list__edit'}
      />
    </>
  );
}

export default UserTable;
