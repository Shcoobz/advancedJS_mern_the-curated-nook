import { SubmitButton } from '../../../../components/common/Buttons';
import { FormHeader } from '../../../../components/common/FormComponents';
import { ROLE } from '../../../../config/common/constants';
import getFormFields from '../../userFormData';
import {
  generateOptionsFromRoles,
  getPasswordInputClass,
  getRolesInputClass,
  getUsernameInputClass,
} from '../userUtils';

function NewUserFormTable({
  username,
  setUsername,
  validUsername,
  password,
  setPassword,
  validPassword,
  roles,
  setRoles,
  canSave,
  handleSave,
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
        title={`New User: ${username}`}
        handleSave={handleSave}
        canSave={canSave}
      />

      <form className='form' onSubmit={handleSave}>
        {renderFormFields}

        <SubmitButton canSave={canSave} />
      </form>
    </>
  );

  return formContent;
}

export default NewUserFormTable;
