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

function Login({ onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(createInitialFormState(ENTITY.login));
  const [login, { isLoading }] = useLoginMutation();

  const updateField = createUpdateField(setFormData);
  const handleFieldChange = handleClick(updateField);

  useEffect(() => {
    const usernameInput = document.getElementById('username');

    if (usernameInput) {
      usernameInput.focus();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateFormData(formData)) return;

    try {
      const { accessToken } = await login(formData).unwrap();

      dispatch(setCredentials({ accessToken }));
      setFormData({ username: '', password: '' });
      toast.success('Login successful!');
      navigate('/backstage');
    } catch (err) {
      handleLoginError(err);
    }
  }

  function loginFormFields() {
    return getLoginFormFields({ formData, handleFieldChange, handleSubmit });
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
