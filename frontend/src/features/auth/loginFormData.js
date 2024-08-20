import { LoginButton } from '../../components/common/Buttons';
import { FormInput } from '../../components/common/FormComponents';

export function getLoginFormFields({ formData, handleFieldChange, handleSubmit }) {
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
  ];
}
