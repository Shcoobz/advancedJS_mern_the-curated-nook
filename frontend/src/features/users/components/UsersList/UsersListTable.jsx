import { CreateButton } from '../../../../components/common/Buttons';
import { TABLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import User from '../User/User';

function UsersListTable({ users, openModal }) {
  const { ids, entities } = users;

  const tableContent = ids?.length
    ? ids.map((userId) => {
        const user = entities[userId];
        return (
          <tr key={userId} onClick={() => openModal(user)} style={{ cursor: 'pointer' }}>
            <User
              userId={userId}
              onEdit={() => openModal({ ...user, isEditing: true })}
            />
          </tr>
        );
      })
    : null;

  return (
    <>
      <div>
        <CreateButton onClick={() => openModal()} text={'New User'} />
        <br />

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
      </div>
    </>
  );
}

export default UsersListTable;
