import { TABLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import {
  TableAboveHeader,
  TableCellHeader,
} from '../../../../components/common/TableComponents';
import SearchInput from '../../../../components/common/SearchInput';
import { useMemo, useState } from 'react';
import { generateTableContent, genericFilter } from '../../../utils/utils';
import User from '../User/User';
import NoResults from '../../../../components/common/NoResults';

function UsersListTable({ users, openModal }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(
    () => genericFilter({ fields: ['username', 'roles'] }, users, searchTerm),
    [users, searchTerm]
  );

  const { ids, entities } = filteredUsers;

  const tableContent = generateTableContent(ids, entities, openModal, User, 'user');

  return (
    <div>
      <SearchInput setSearchTerm={setSearchTerm} searchType='Users' />

      <TableAboveHeader
        descriptionText={UI.BS.PAGE.USER.list.paragraph}
        onCreateClick={() => openModal()}
        onWishlistClick={undefined}
      />

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
      {ids.length === 0 && <NoResults />}
    </div>
  );
}

export default UsersListTable;
