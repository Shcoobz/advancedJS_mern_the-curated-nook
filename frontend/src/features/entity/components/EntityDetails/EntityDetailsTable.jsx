import {
  TableItemDetail,
  TableItemDetailHeader,
  TableItemDetailImage,
} from '../../../../components/common/TableComponents';
import useAuth from '../../../../hooks/useAuth';

function EntityDetailsTable({
  item,
  onClose,
  handleEditClick,
  handleDelete,
  type,
  imageConfig,
  details,
  description,
}) {
  const { isSuperuser, isAdmin } = useAuth();
  const isProtected = type === 'user' ? isAdmin : isSuperuser || isAdmin;

  const { imageUrl, thumbnailUrl, stockImage, altText, titleText, className } =
    imageConfig;

  const hasValidImageUrl = imageUrl && imageUrl !== 'N/A';
  const hasValidThumbnailUrl = thumbnailUrl && thumbnailUrl !== 'N/A';

  const displayImageUrl = hasValidImageUrl
    ? imageUrl
    : hasValidThumbnailUrl
    ? thumbnailUrl
    : stockImage;

  const isStockImage = displayImageUrl === stockImage;

  const imageContainerClass =
    type === 'lego'
      ? `${type}__modal-image${isStockImage ? '--stock' : ''}`
      : `${type}__modal-image`;

  const tableContent = (
    <div className={`${type}__modal-container`}>
      <TableItemDetailHeader
        title={`${type.charAt(0).toUpperCase() + type.slice(1)}: ${
          item.name || item.title || item.username
        }`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
        isProtected={isProtected}
      />

      <div className={`${type}__modal-content`}>
        <div className={imageContainerClass}>
          <TableItemDetailImage
            src={displayImageUrl}
            alt={altText}
            title={titleText}
            className={className}
          />
        </div>

        <div className={`${type}__modal-info`}>
          <div className={`${type}__modal-details`}>
            {details.map((detail, index) => (
              <TableItemDetail key={index} label={detail.label} value={detail.value} />
            ))}
          </div>
        </div>
      </div>
      {description && (
        <div className={`${type}__modal-description`}>
          <TableItemDetail label='Description:' value={description} />
        </div>
      )}
    </div>
  );

  return tableContent;
}

export default EntityDetailsTable;
