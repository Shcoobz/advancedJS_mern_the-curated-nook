import { CreateButton } from '../../../../components/common/Buttons';
import { TABLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import {
  TableCellHeader,
  TableDescription,
} from '../../../../components/common/TableComponents';

import User from '../User/User';

function UsersListTable({ users, openModal }) {
  const { ids, entities } = users;

  const tableContent = ids?.length
    ? ids.map((userId) => {
        const user = entities[userId];

        return (
          <tr
            key={userId}
            onClick={() => openModal(user)}
            className={'table__row-cursor'}>
            <User
              userId={userId}
              onEdit={() => openModal({ ...user, isEditing: true })}
            />
          </tr>
        );
      })
    : null;

  return (
    <div>
      <CreateButton onClick={() => openModal()} text={'New User'} />
      <TableDescription text={UI.BS.PAGE.USER.list.paragraph} />

      <br />

      <table className='table table--users'>
        <thead className='table__thead'>
          <tr>
            <TableCellHeader label={TABLE.TITLE.USER.name} className='user__username' />
            <TableCellHeader label={TABLE.TITLE.USER.roles} className='user__roles' />
            <TableCellHeader label={TABLE.TITLE.USER.action} className='user__action' />
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  );
}

export default UsersListTable;
