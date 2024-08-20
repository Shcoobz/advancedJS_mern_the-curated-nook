import { LoginButton } from '../../components/common/Buttons';
import { FormCheckbox, FormInput } from '../../components/common/FormComponents';

export function getLoginFormFields({
  formData,
  handleFieldChange,
  handleSubmit,
  handleToggle,
  persist,
}) {
  return [
    {
      component: FormInput,
      type: 'text',
      id: 'username',
      name: 'username',
      label: 'Username:',
      value: formData.username,
      onChange: handleFieldChange,
      required: true,
      autoComplete: 'off',
    },
    {
      component: FormInput,
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Password:',
      value: formData.password,
      onChange: handleFieldChange,
      required: true,
    },
    {
      component: LoginButton,
      type: 'submit',
      className: 'form__login-button',
      children: 'Login',
      onClick: handleSubmit,
    },
    {
      component: FormCheckbox,
      label: 'Remember Me',
      id: 'persist',
      name: 'persist',
      checked: persist,
      onChange: handleToggle,
    },
  ];
}
