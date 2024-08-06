import { CreateButton } from '../../../../components/common/Buttons';
import { TABLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import {
  TableAboveHeader,
  TableCellHeader,
  TableDescription,
} from '../../../../components/common/TableComponents';

import User from '../User/User';

function UsersListTable({ users, openModal }) {
  const { ids, entities } = users;

  const tableContent = ids?.length
    ? ids.map((userId, index) => {
        const user = entities[userId];

        return (
          <tr
            key={userId}
            onClick={() => openModal(user)}
            className={'table__row-cursor'}>
            <td className='table__cell item__number'>{index + 1}</td>
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
      <TableAboveHeader
        descriptionText={UI.BS.PAGE.USER.list.paragraph}
        onCreateClick={() => openModal()}
        onWishlistClick={undefined}
      />

      <table className='table table__users'>
        <thead className='table__thead'>
          <tr>
            <TableCellHeader label='Number' className='user__number' />
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
