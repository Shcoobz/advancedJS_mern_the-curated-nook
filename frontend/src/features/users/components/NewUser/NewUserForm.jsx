import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useAddNewUserMutation } from '../../api/usersApiSlice';
import { DEFAULT, ROLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import {
  canSaveNewUserForm,
  generateOptionsFromRoles,
  getErrorMessageClass,
  getPasswordInputClass,
  getRolesInputClass,
  getUsernameInputClass,
  handlePasswordChange,
  handleRolesChange,
  handleSaveNewUser,
  handleUsernameChange,
  useHandleSuccess,
  useValidatePassword,
  useValidateUsername,
} from '../utils';

function NewUserForm() {
  const navigate = useNavigate();

  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();

  const [username, setUsername] = useState(DEFAULT.emptyString);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState(DEFAULT.emptyString);
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState([ROLE.user]);

  const canSave = canSaveNewUserForm(
    roles.length,
    validUsername,
    validPassword,
    isLoading
  );
  const options = generateOptionsFromRoles(ROLE);

  const errClass = getErrorMessageClass(isError);
  const validUserClass = getUsernameInputClass(validUsername);
  const validPwdClass = getPasswordInputClass(validPassword);
  const validRolesClass = getRolesInputClass(roles.length);

  useValidateUsername(username, setValidUsername);
  useValidatePassword(password, setValidPassword);
  useHandleSuccess(isSuccess, navigate, setUsername, setPassword, setRoles);

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form
        className='form'
        onSubmit={handleSaveNewUser(addNewUser, canSave, username, password, roles)}>
        <div className='form__title-row'>
          <h2>{UI.BS.PAGE.USER.TABLE.titleNew}</h2>
          <div className='form__action-buttons'>
            <button className='icon-button' title='Save' disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label className='form__label' htmlFor='username'>
          {UI.BS.PAGE.USER.TABLE.username}{' '}
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
      </form>
    </>
  );

  return content;
}

export default NewUserForm;
