import { EditButton } from '../../../../components/common/Buttons';
import { DEFAULT } from '../../../../config/common/constants';

function formatRoles(roles) {
  return roles.toString().replaceAll(DEFAULT.comma, DEFAULT.commaSpace);
}

function getCellStatus(userActive) {
  return userActive ? DEFAULT.emptyString : 'table__cell--inactive';
}

function UserTableRow({ user, onEdit }) {
  if (!user) return null;

  const userRolesString = formatRoles(user.roles);
  const cellStatus = getCellStatus(user.active);

  return (
    <tr className='table__row user'>
      <td className={`table__cell ${cellStatus}`}>{user.username}</td>
      <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
      <td className={`table__cell ${cellStatus}`}>
        <EditButton onClick={() => onEdit(user)} />
      </td>
    </tr>
  );
}

export default UserTableRow;
