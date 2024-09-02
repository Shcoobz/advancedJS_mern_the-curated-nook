import { TABLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import { TableCellHeader } from '../../../../components/common/TableComponents';
import { useMemo } from 'react';
import { generateTableContent, genericFilter } from '../../../utils/utils';
import { useOutletContext } from 'react-router-dom';
import ConditionalList from '../../../../components/common/ConditionalList';
import useAuth from '../../../../hooks/useAuth';
import MemoizedEntity from '../../../entity/Components/Entity/MemoizedEntity';

function UsersListTable({ users, openModal }) {
  const { isAdmin } = useAuth();
  const isProtected = isAdmin;
  const { searchTerm } = useOutletContext();

  const filteredUsers = useMemo(
    () => genericFilter({ fields: ['username', 'roles'] }, users, searchTerm),
    [users, searchTerm]
  );

  const { ids, entities } = filteredUsers;

  const tableClass = isProtected
    ? 'table__users--with-actions'
    : 'table__users--without-actions';

  // const tableContent = generateTableContent(ids, entities, openModal, User, 'user');

  const tableContent = generateTableContent(
    ids,
    entities,
    openModal,
    MemoizedEntity,
    'user'
  );

  const userTable = ids.length > 0 && (
    <table className={`table ${tableClass}`}>
      <thead className='table__thead'>
        <tr>
          <TableCellHeader label='No.' className='user__number' />
          <TableCellHeader label='Image' className='user__thumbnail' />
          <TableCellHeader label={TABLE.TITLE.USER.name} className='user__username' />
          <TableCellHeader label={TABLE.TITLE.USER.roles} className='user__roles' />

          {isProtected && (
            <TableCellHeader label={TABLE.TITLE.USER.action} className='user__action' />
          )}
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
      isProtected={isProtected}
    />
  );
}

export default UsersListTable;
