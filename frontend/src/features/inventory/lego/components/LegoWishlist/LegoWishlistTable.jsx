import { LINK } from '../../../../../config/common/constants';
import { UI } from '../../../../../config/common/messages';
import EntityWishlistTable from '../../../../entity/components/EntityWishlist/EntityWishlistTable';

function LegoWishlistTable({ lego, openModal }) {
  const columns = [
    { label: 'No.', className: 'lego__number' },
    { label: 'Image', className: 'lego__thumbnail' },
    { label: 'Name', className: 'lego__name' },
    { label: 'Set Number', className: 'lego__setNumber' },
  ];

  return (
    <EntityWishlistTable
      entities={lego}
      openModal={openModal}
      entityType='lego'
      columns={columns}
      filterFields={['name', 'setNumber']}
      descriptionText={UI.BS.PAGE.LEGO.list.paragraph}
      createButtonText='New Lego'
      homeLink={LINK.LEGO.viewLego}
      tableClassName='table__lego'
    />
  );
}

export default LegoWishlistTable;
