import {
  TableItemDetail,
  TableItemDetailHeader,
  TableItemDetailImage,
} from '../../../../components/common/TableComponents';

import stockImageUser from '../../../../img/stockimageUser.png';

function UserDetailsTable({ user, onClose, handleEditClick, handleDelete }) {
  const formattedRoles = user.roles.join(', ');

  const hasValidImageUrl = user.imageUrl && user.imageUrl !== 'N/A';
  const hasValidThumbnailUrl = user.thumbnailUrl && user.thumbnailUrl !== 'N/A';

  const imageUrl = hasValidImageUrl
    ? user.imageUrl
    : hasValidThumbnailUrl
    ? user.thumbnailUrl
    : stockImageUser;

  const tableContent = (
    <div className='user__modal-container'>
      <TableItemDetailHeader
        title={`User: ${user?.username}`}
        handleEditClick={handleEditClick}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <div className='user__modal-content'>
        <div className='user__modal-image'>
          <TableItemDetailImage
            src={imageUrl}
            alt={`Cover of ${user.title}`}
            title={`Cover Image of ${user.title}`}
            className='user__cover-image'
          />
        </div>

        <div className='user__modal-info'>
          <div className='user__modal-details'>
            <TableItemDetail label='Username:' value={user?.username} />
            <TableItemDetail label='Roles:' value={formattedRoles} />
            <TableItemDetail label='Active:' value={user?.active ? 'Yes' : 'No'} />
          </div>
        </div>
      </div>
    </div>
  );

  return tableContent;
}

export default UserDetailsTable;
