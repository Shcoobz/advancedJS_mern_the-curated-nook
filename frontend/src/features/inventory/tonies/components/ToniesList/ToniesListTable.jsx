import { UI } from '../../../../../config/common/messages';
import { LINK } from '../../../../../config/common/constants';
import EntityListTable from '../../../../entity/components/EntityList/EntityListTable';

function ToniesListTable({ tonies, openModal }) {
  const filterFields = ['name'];

  const columns = [
    { label: 'No.', className: 'tonie__number' },
    { label: 'Image', className: 'tonie__thumbnail' },
    { label: 'Name', className: 'tonie__name' },
    { label: 'Description', className: 'tonie__description' },
  ];

  return (
    <EntityListTable
      entities={tonies}
      openModal={openModal}
      entityType='tonie'
      columns={columns}
      filterFields={filterFields}
      descriptionText={UI.BS.PAGE.TONIE.list.paragraph}
      createButtonText='New Tonie'
      wishlistLink={LINK.TONIE.wishlist}
      tableClassName='table__tonies'
    />
  );
}

export default ToniesListTable;
