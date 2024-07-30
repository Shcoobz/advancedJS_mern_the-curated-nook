import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useAddNewUserMutation } from '../../api/usersApiSlice';
import { DEFAULT, ROLE } from '../../../../config/common/constants';
import { TOAST, UI } from '../../../../config/common/messages';
import {
  canSaveNewUserForm,
  generateOptionsFromRoles,
  getPasswordInputClass,
  getRolesInputClass,
  getUsernameInputClass,
  handlePasswordChange,
  handleRolesChange,
  handleSaveNewUser,
  handleUsernameChange,
  useHandleUserSuccess,
  useValidatePassword,
  useValidateUsername,
} from '../userUtils';
import { toast } from 'react-toastify';
import Modal from '../../../../components/common/Modal';

function NewUserForm({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();

  const [username, setUsername] = useState(DEFAULT.emptyString);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(['User']);

  const canSave = canSaveNewUserForm(
    roles.length,
    validUsername,
    validPassword,
    isLoading
  );
  const options = generateOptionsFromRoles(ROLE);

  const validUserClass = getUsernameInputClass(validUsername);
  const validPwdClass = getPasswordInputClass(validPassword);
  const validRolesClass = getRolesInputClass(roles.length);

  useValidateUsername(username, setValidUsername);
  useValidatePassword(password, setValidPassword);
  useHandleUserSuccess(
    isSuccess,
    undefined,
    navigate,
    setUsername,
    setPassword,
    setRoles
  );

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveNewUser(addNewUser, username, password, roles);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.created);
    }
  }

  const modalContent = (
    <>
      <div className='form-header__container'>
        <h2>Create User</h2>
        <div className='form-header__action-buttons'>
          <button
            className='icon-button'
            title='Save'
            onClick={handleSave}
            disabled={!canSave}>
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </div>
      
      <form className='form' onSubmit={handleSave}>
        <label className='form__label' htmlFor='username'>
          {UI.BS.PAGE.USER.TABLE.username}
          <span className='nowrap'>{UI.BS.PAGE.USER.TABLE.usernameRule}</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id='username'
          name='username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={handleUsernameChange(setUsername)}
        />

        <label className='form__label' htmlFor='password'>
          {UI.BS.PAGE.USER.TABLE.password}
          <span className='nowrap'>{UI.BS.PAGE.USER.TABLE.passwordRule}</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePasswordChange(setPassword)}
        />

        <label className='form__label' htmlFor='roles'>
          {UI.BS.PAGE.USER.TABLE.assignedRoles}
        </label>
        <select
          id='roles'
          name='roles'
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size='3'
          value={roles}
          onChange={handleRolesChange(setRoles)}>
          {options}
        </select>
        <button type='submit' className='submit-button' disabled={!canSave}></button>
      </form>
    </>
  );

  const modal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      {modalContent}
    </Modal>
  );

  return modal;
}

export default NewUserForm;
