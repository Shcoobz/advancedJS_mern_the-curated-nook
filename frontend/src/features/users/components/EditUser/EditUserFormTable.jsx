import { ROLE } from '../../../../config/common/constants';
import { SubmitButton } from '../../../../components/common/Buttons';
import {
  generateOptionsFromRoles,
  getPasswordInputClass,
  getRolesInputClass,
  getUsernameInputClass,
} from '../userUtils';
import { FormHeader } from '../../../../components/common/FormComponents';
import getFormFields from '../../userFormData';

function EditUserFormTable({
  username,
  setUsername,
  validUsername,
  password,
  setPassword,
  validPassword,
  roles,
  setRoles,
  active,
  setActive,
  canSave,
  handleSave,
  handleDelete,
  onClose,
}) {
  const validUserClass = getUsernameInputClass(validUsername);
  const validPwdClass = getPasswordInputClass(validPassword);
  const validRolesClass = getRolesInputClass(roles.length);
  const options = generateOptionsFromRoles(ROLE);

  const formFields = getFormFields({
    username,
    setUsername,
    validUserClass,
    password,
    setPassword,
    validPwdClass,
    active,
    setActive,
    roles,
    setRoles,
    options,
    validRolesClass,
  });

  const renderFormFields = formFields.map((field, index) => {
    const Component = field.component;

    return <Component key={index} {...field} />;
  });

  const formContent = (
    <>
      <FormHeader
        title={`Edit User: ${username}`}
        handleSave={handleSave}
        canSave={canSave}
        handleDelete={handleDelete}
        onClose={onClose}
      />

      <form className='form' onSubmit={handleSave}>
        {renderFormFields}

        <SubmitButton canSave={canSave} />
      </form>
    </>
  );

  return formContent;
}

export default EditUserFormTable;
