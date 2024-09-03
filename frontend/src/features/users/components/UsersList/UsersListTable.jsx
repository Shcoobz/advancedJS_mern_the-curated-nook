import { TABLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import EntityListTable from '../../../entity/Components/EntityList/EntityListTable';

function UsersListTable({ users, openModal }) {
  const filterFields = ['username', 'roles'];

  const columns = [
    { label: 'No.', className: 'user__number' },
    { label: 'Image', className: 'user__thumbnail' },
    { label: TABLE.TITLE.USER.name, className: 'user__username' },
    { label: TABLE.TITLE.USER.roles, className: 'user__roles' },
  ];

  return (
    <EntityListTable
      entities={users}
      openModal={openModal}
      entityType='user'
      columns={columns}
      filterFields={filterFields}
      descriptionText={UI.BS.PAGE.USER.list.paragraph}
      createButtonText='New User'
      tableClassName='table__users'
    />
  );
}

export default UsersListTable;
