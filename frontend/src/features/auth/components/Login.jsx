import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/authApiSlice';
import { setCredentials } from '../state/authSlice';
import { DynamicForm } from '../../../components/common/FormComponents';
import { toast } from 'react-toastify';
import { getLoginFormFields } from '../loginFormData';
import { ENTITY } from '../../../config/common/constants';
import {
  createInitialFormState,
  createUpdateField,
  handleClick,
  handleLoginError,
  validateFormData,
} from '../../utils/formUtils';

import Spinner from '../../../components/common/Spinner';
import usePersist from '../../../hooks/usePersist';

function Login({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(createInitialFormState(ENTITY.login));
  const [login, { isLoading }] = useLoginMutation();
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [persist, setPersist] = usePersist();

  const updateField = createUpdateField(setFormData);
  const handleFieldChange = handleClick(updateField);

  useEffect(() => {
    if (!loginAttempted) {
      const usernameInput = document.getElementById('username');

      if (usernameInput) {
        usernameInput.focus();
      }
    }

    if (loginAttempted && loginFailed) {
      const passwordInput = document.getElementById('password');

      if (passwordInput) {
        passwordInput.focus();
      }
    }
  }, [loginAttempted, loginFailed]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoginAttempted(true);

    if (!validateFormData(formData)) return;

    try {
      const { accessToken } = await login(formData).unwrap();

      dispatch(setCredentials({ accessToken }));
      setFormData({ username: '', password: '' });
      toast.success('Login successful!');
      navigate('/backstage');
      setLoginFailed(false);
      setLoginAttempted(false);
    } catch (err) {
      handleLoginError(err);
      setLoginFailed(true);
    }
  }

  function loginFormFields() {
    return getLoginFormFields({
      formData,
      handleFieldChange,
      handleSubmit,
      handleToggle,
      persist,
    });
  }

  function handleToggle() {
    return setPersist((prev) => !prev);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className='login__modal-container'>
      <DynamicForm
        title='Family Login'
        formData={formData}
        getFormFields={loginFormFields}
        handleFieldChange={handleFieldChange}
        handleSave={handleSubmit}
        onClose={onClose}
        hideSaveButton={true}
      />
    </div>
  );
}

export default Login;
