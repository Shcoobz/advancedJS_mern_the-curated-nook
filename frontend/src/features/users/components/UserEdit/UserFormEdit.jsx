import { TOAST } from '../../../../config/common/messages';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../api/usersApiSlice';
import UserFormEditTable from './UserFormEditTable';
import {
  canSaveExistingUserForm,
  generateExistingUserPayload,
  validatePassword,
  validateUsername,
} from '../../../utils/formUtils';
import { ENTITY } from '../../../../config/common/constants';
import EntityFormEdit from '../../../entity/Components/EntityEdit/EntityFormEdit';

function UserFormEdit({ user, isOpen, onClose }) {
  const validations = {
    username: validateUsername,
    password: validatePassword,
  };

  return (
    <EntityFormEdit
      entity={user}
      entityType={ENTITY.user}
      isOpen={isOpen}
      onClose={onClose}
      isWishlist={false}
      FormTable={UserFormEditTable}
      useUpdateMutation={useUpdateUserMutation}
      useDeleteMutation={useDeleteUserMutation}
      generateExistingPayload={generateExistingUserPayload}
      validations={validations}
      canSaveFunction={canSaveExistingUserForm}
      successMessages={TOAST.SUCCESS.USER}
    />
  );
}

export default UserFormEdit;
