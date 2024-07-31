import {
  FormCheckbox,
  FormInput,
  FormSelect,
} from '../../components/common/FormComponents';
import { UI } from '../../config/common/messages';
import {
  handlePasswordChange,
  handleRolesChange,
  handleToggleActive,
  handleUsernameChange,
} from './components/userUtils';

const getFormFields = ({
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
}) => {
  const fields = [
    {
      component: FormInput,
      label: UI.BS.PAGE.USER.TABLE.username,
      id: 'username',
      name: 'username',
      type: 'text',
      value: username,
      onChange: handleUsernameChange(setUsername),
      validClass: validUserClass,
      children: <span className='nowrap'>{UI.BS.PAGE.USER.TABLE.usernameRule}</span>,
    },
    {
      component: FormInput,
      label: UI.BS.PAGE.USER.TABLE.password,
      id: 'password',
      name: 'password',
      type: 'password',
      value: password,
      onChange: handlePasswordChange(setPassword),
      validClass: validPwdClass,
      children: (
        <>
          <span className='nowrap'> {UI.BS.PAGE.USER.TABLE.passwordRuleEmpty}</span>
          <span className='nowrap'> {UI.BS.PAGE.USER.TABLE.passwordRule}</span>
        </>
      ),
    },
    {
      component: FormSelect,
      label: UI.BS.PAGE.USER.TABLE.assignedRoles,
      id: 'roles',
      name: 'roles',
      className: validRolesClass,
      multiple: true,
      size: '3',
      value: roles,
      onChange: handleRolesChange(setRoles),
      options: options,
    },
  ];

  if (active !== undefined && setActive !== undefined) {
    fields.push({
      component: FormCheckbox,
      label: UI.BS.PAGE.USER.TABLE.active,
      id: 'user-active',
      name: 'user-active',
      checked: active,
      onChange: handleToggleActive(setActive),
    });
  }

  return fields;
};

export default getFormFields;
