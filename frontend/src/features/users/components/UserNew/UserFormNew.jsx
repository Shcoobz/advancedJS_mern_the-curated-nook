import { useAddNewUserMutation } from '../../api/usersApiSlice';
import UserFormNewTable from './UserFormNewTable';
import {
  generateNewUserPayload,
  validatePassword,
  validateUsername,
} from '../../../utils/formUtils';
import { ENTITY } from '../../../../config/common/constants';
import EntityFormNew from '../../../entity/Components/EntityNew/EntityFormNew';

function UserFormNew({ isOpen, onClose }) {
  const validations = {
    username: validateUsername,
    password: validatePassword,
  };

  function canSaveUser(formData, isLoading) {
    return formData.username && formData.password && !isLoading;
  }

  return (
    <EntityFormNew
      isOpen={isOpen}
      onClose={onClose}
      entity={ENTITY.user}
      addNewEntityMutation={useAddNewUserMutation}
      FormTable={UserFormNewTable}
      generateNewEntityPayload={generateNewUserPayload}
      validations={validations}
      canSaveFunction={canSaveUser}
    />
  );
}

export default UserFormNew;
