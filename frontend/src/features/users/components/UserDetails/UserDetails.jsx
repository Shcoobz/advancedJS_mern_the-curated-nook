import { useDeleteUserMutation } from '../../api/usersApiSlice';
import { TOAST } from '../../../../config/common/messages';
import UserDetailsTable from './UserDetailsTable';
import EntityDetails from '../../../entity/Components/entityDetails/entityDetails';

function UserDetails({ user, isOpen, onClose, onEdit }) {
  return (
    <EntityDetails
      entity={user}
      entityName='User'
      isOpen={isOpen}
      onClose={onClose}
      onEdit={onEdit}
      useDeleteMutation={useDeleteUserMutation}
      DetailsTable={UserDetailsTable}
      successMessage={TOAST.SUCCESS.USER.deleted}
    />
  );
}

export default UserDetails;
