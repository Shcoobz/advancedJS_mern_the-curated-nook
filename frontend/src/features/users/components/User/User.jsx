import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectUserById } from '../../api/usersApiSlice';
import { DEFAULT } from '../../../../config/common/constants';

function formatRoles(roles) {
  return roles.toString().replaceAll(DEFAULT.comma, DEFAULT.commaSpace);
}

function getCellStatus(userActive) {
  return userActive ? DEFAULT.emptyString : 'table__cell--inactive';
}

function User({ userId, onEdit }) {
  const user = useSelector((state) => selectUserById(state, userId));

  function handleEdit() {
    onEdit(user);
  }

  if (user) {
    const userRolesString = formatRoles(user.roles);
    const cellStatus = getCellStatus(user.active);

    return (
      <tr className='table__row user'>
        <td className={`table__cell  ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className='icon-button table__button' onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export default User;
