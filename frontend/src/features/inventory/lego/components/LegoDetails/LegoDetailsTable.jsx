import {
  TableItemDetail,
  TableItemDetailHeader,
} from '../../../../../components/common/TableComponents';
import { isUUID } from '../legoUtils';

function LegoDetailsTable({ lego, onClose, handleEditClick, handleDelete }) {
  const displaySetNumber = isUUID(lego.setNumber) ? 'N/A' : lego.setNumber;

  const tableContent = (
    <>
      <TableItemDetailHeader
        title={`Lego Details: ${lego.name}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='details'>
        <TableItemDetail label='Name:' value={lego?.name} />
        <TableItemDetail label='SetNumber:' value={displaySetNumber} />
        <TableItemDetail label='Thumbnail URL:' value={lego?.thumbnailUrl} />
        <TableItemDetail label='Image URL:' value={lego?.imageUrl} />
        <TableItemDetail label='On Wishlist:' value={lego?.isOnWishlist ? 'Yes' : 'No'} />
      </div>
    </>
  );

  return tableContent;
}

export default LegoDetailsTable;
