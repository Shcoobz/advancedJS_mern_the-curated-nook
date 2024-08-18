import { TABLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import { TableCellHeader } from '../../../../components/common/TableComponents';
import { useMemo } from 'react';
import { generateTableContent, genericFilter } from '../../../utils/utils';
import { useOutletContext } from 'react-router-dom';
import User from '../User/User';
import ConditionalList from '../../../../components/common/ConditionalList';

function UsersListTable({ users, openModal }) {
  const { searchTerm } = useOutletContext();

  const filteredUsers = useMemo(
    () => genericFilter({ fields: ['username', 'roles'] }, users, searchTerm),
    [users, searchTerm]
  );

  const { ids, entities } = filteredUsers;

  const tableContent = generateTableContent(ids, entities, openModal, User, 'user');

  const userTable = ids.length > 0 && (
    <table className='table table__users'>
      <thead className='table__thead'>
        <tr>
          <TableCellHeader label='No.' className='user__number' />
          <TableCellHeader label='Image' className='user__thumbnail' />
          <TableCellHeader label={TABLE.TITLE.USER.name} className='user__username' />
          <TableCellHeader label={TABLE.TITLE.USER.roles} className='user__roles' />
          <TableCellHeader label={TABLE.TITLE.USER.action} className='user__action' />
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );

  return (
    <ConditionalList
      ids={ids}
      descriptionText={UI.BS.PAGE.USER.list.paragraph}
      onCreateClick={() => openModal()}
      table={userTable}
      createButtonText='New User'
    />
  );
}

export default UsersListTable;
