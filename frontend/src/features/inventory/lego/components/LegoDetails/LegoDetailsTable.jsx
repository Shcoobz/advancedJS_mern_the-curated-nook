import {
  TableItemDetail,
  TableItemDetailHeader,
  TableItemDetailImage,
} from '../../../../../components/common/TableComponents';
import { isUUID } from '../../../../utils/formUtils';
import stockImageLego from '../../../../../img/stockimageLego.png';

function LegoDetailsTable({ lego, onClose, handleEditClick, handleDelete }) {
  const displaySetNumber = isUUID(lego.setNumber) ? 'N/A' : lego.setNumber;

  const hasValidImageUrl = lego.imageUrl && lego.imageUrl !== 'N/A';
  const hasValidThumbnailUrl = lego.thumbnailUrl && lego.thumbnailUrl !== 'N/A';

  const imageUrl = hasValidImageUrl
    ? lego.imageUrl
    : hasValidThumbnailUrl
    ? lego.thumbnailUrl
    : stockImageLego;

  const imageClass =
    imageUrl === stockImageLego ? 'lego__modal-image--stock' : 'lego__modal-image';

  const tableContent = (
    <div className='lego__modal-container'>
      <TableItemDetailHeader
        title={`Lego Set: ${lego.name}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='lego__modal-content'>
        <div className={imageClass}>
          <TableItemDetailImage
            src={imageUrl}
            alt={`Cover of ${lego.title}`}
            title={`Cover Image of ${lego.title}`}
            className='lego__cover-image'
          />
        </div>

        <div className='lego__modal-info'>
          <div className='lego__modal-details'>
            <TableItemDetail label='Set number:' value={displaySetNumber} />
            <TableItemDetail label='Theme ID:' value={lego.themeId} />
            <TableItemDetail label='Theme name:' value={lego.themeName} />
            <TableItemDetail label='Year:' value={lego.year} />
          </div>
        </div>
      </div>
    </div>
  );

  return tableContent;
}

export default LegoDetailsTable;
