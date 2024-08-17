import {
  FormCheckbox,
  FormInput,
  FormSelect,
} from '../../components/common/FormComponents';
import { ROLE } from '../../config/common/constants';
import { UI } from '../../config/common/messages';
import { generateOptionsFromRoles, getInputClass } from '../utils/formUtils';

const getUserFormFields = ({ formData, handleFieldChange }) => {
  const fields = [
    {
      component: FormInput,
      label: UI.BS.PAGE.USER.TABLE.username,
      id: 'username',
      name: 'username',
      type: 'text',
      value: formData.username,
      onChange: handleFieldChange,
      validClass: getInputClass(formData.validUsername),
      children: <span className='nowrap'>{UI.BS.PAGE.USER.TABLE.usernameRule}</span>,
    },
    {
      component: FormInput,
      label: UI.BS.PAGE.USER.TABLE.password,
      id: 'password',
      name: 'password',
      type: 'password',
      value: formData.password,
      onChange: handleFieldChange,
      validClass: getInputClass(formData.validPassword),
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
      multiple: true,
      size: '3',
      value: formData.roles,
      onChange: handleFieldChange,
      validClass: getInputClass(formData.roles.length === 0, 'roles'),
      options: generateOptionsFromRoles(ROLE),
    },
  ];

  if (formData.active !== undefined) {
    fields.push({
      component: FormCheckbox,
      label: UI.BS.PAGE.USER.TABLE.active,
      id: 'active',
      name: 'active',
      checked: formData.active,
      onChange: handleFieldChange,
    });
  }

  return fields;
};

export default getUserFormFields;
