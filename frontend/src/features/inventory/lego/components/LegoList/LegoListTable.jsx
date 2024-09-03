import { UI } from '../../../../../config/common/messages';
import { LINK } from '../../../../../config/common/constants';
import EntityListTable from '../../../../entity/components/EntityList/EntityListTable';

function LegoListTable({ lego, openModal }) {
  const filterFields = ['name', 'setNumber'];

  const columns = [
    { label: 'No.', className: 'lego__number' },
    { label: 'Image', className: 'lego__thumbnail' },
    { label: 'Name', className: 'lego__name' },
    { label: 'Set Number', className: 'lego__setNumber' },
  ];

  return (
    <EntityListTable
      entities={lego}
      openModal={openModal}
      entityType='lego'
      columns={columns}
      filterFields={filterFields}
      descriptionText={UI.BS.PAGE.LEGO.list.paragraph}
      createButtonText='New Lego Set'
      wishlistLink={LINK.LEGO.wishlist}
      tableClassName='table__lego'
    />
  );
}

export default LegoListTable;
