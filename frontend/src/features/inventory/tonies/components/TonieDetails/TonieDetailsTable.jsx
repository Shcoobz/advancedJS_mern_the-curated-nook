import {
  TableItemDetail,
  TableItemDetailHeader,
  TableItemDetailImage,
} from '../../../../../components/common/TableComponents';

import stockImageTonie from '../../../../../img/stockimageTonie.png';

function TonieDetailsTable({ tonie, onClose, handleEditClick, handleDelete }) {
  const hasValidImageUrl = tonie.imageUrl && tonie.imageUrl !== 'N/A';
  const hasValidThumbnailUrl = tonie.thumbnailUrl && tonie.thumbnailUrl !== 'N/A';

  const imageUrl = hasValidImageUrl
    ? tonie.imageUrl
    : hasValidThumbnailUrl
    ? tonie.thumbnailUrl
    : stockImageTonie;

  const tableContent = (
    <div className='tonie__modal-container'>
      <TableItemDetailHeader
        title={`Tonie: ${tonie.name}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='tonie__modal-content'>
        <div className='tonie__modal-image'>
          <TableItemDetailImage
            src={imageUrl}
            alt={`Cover of ${tonie.name}`}
            titleList={`Cover Image of ${tonie.name}`}
            className='tonie__cover-image'
          />
        </div>

        <div className='tonie__modal-info'>
          <div className='tonie__modal-details'>
            <TableItemDetail label='Title List:' value={tonie.titleList} />
          </div>
        </div>
      </div>
      <div className='tonie__modal-description'>
        <TableItemDetail label='Description:' value={tonie?.description} />
      </div>
    </div>
  );

  return tableContent;
}

export default TonieDetailsTable;
