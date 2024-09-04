import { UI } from '../../../../../config/common/messages';
import { LINK } from '../../../../../config/common/constants';
import EntityWishlistTable from '../../../../entity/components/EntityWishlist/EntityWishlistTable';

function TonieWishlistTable({ tonies, openModal }) {
  const columns = [
    { label: 'No.', className: 'tonie__number' },
    { label: 'Image', className: 'tonie__thumbnail' },
    { label: 'Name', className: 'tonie__name' },
    { label: 'Description', className: 'tonie__description' },
  ];

  return (
    <EntityWishlistTable
      entities={tonies}
      openModal={openModal}
      entityType='tonie'
      columns={columns}
      filterFields={['name']}
      descriptionText={UI.BS.PAGE.TONIE.list.paragraph}
      createButtonText='New Tonie'
      homeLink={LINK.TONIE.viewTonies}
      tableClassName='table__tonies'
    />
  );
}

export default TonieWishlistTable;
