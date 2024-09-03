import stockImageUser from '../../../../img/stockimageUser.png';
import EntityDetailsTable from '../../../entity/components/EntityDetails/EntityDetailsTable';

function UserDetailsTable({ user, onClose, handleEditClick, handleDelete }) {
  const formattedRoles = user.roles.join(', ');

  const imageConfig = {
    imageUrl: user.imageUrl,
    thumbnailUrl: user.thumbnailUrl,
    stockImage: stockImageUser,
    altText: `Avatar of ${user.username}`,
    titleText: `Avatar of ${user.username}`,
    className: 'user__cover-image',
  };

  const details = [
    { label: 'Username:', value: user.username },
    { label: 'Roles:', value: formattedRoles },
    { label: 'Active:', value: user.active ? 'Yes' : 'No' },
  ];

  const tableContent = (
    <EntityDetailsTable
      item={user}
      onClose={onClose}
      handleEditClick={handleEditClick}
      handleDelete={handleDelete}
      type='user'
      imageConfig={imageConfig}
      details={details}
    />
  );

  return tableContent;
}

export default UserDetailsTable;
