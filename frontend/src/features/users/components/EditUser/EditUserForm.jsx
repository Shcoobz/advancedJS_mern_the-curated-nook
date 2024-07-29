import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ROLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../api/usersApiSlice';
import {
  canSaveExistingUserForm,
  generateOptionsFromRoles,
  getErrorContent,
  getErrorMessageClass,
  getPasswordInputClass,
  getRolesInputClass,
  getUsernameInputClass,
  handleDeleteUser,
  handlePasswordChange,
  handleRolesChange,
  handleSaveExistingUser,
  handleToggleActive,
  handleUsernameChange,
  useHandleSuccess,
  useValidatePassword,
  useValidateUsername,
} from '../utils';

function EditUserForm({ user }) {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, error: delError }] =
    useDeleteUserMutation();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  const canSave = canSaveExistingUserForm(
    roles.length,
    validUsername,
    validPassword,
    isLoading,
    password
  );
  const options = generateOptionsFromRoles(ROLE);

  const errClass = getErrorMessageClass(isError, isDelError);
  const validUserClass = getUsernameInputClass(validUsername);
  const validPwdClass = getPasswordInputClass(validPassword);
  const validRolesClass = getRolesInputClass(roles.length);
  const errContent = getErrorContent(error, delError);

  useValidateUsername(username, setValidUsername);
  useValidatePassword(password, setValidPassword);
  useHandleSuccess(isSuccess, isDelSuccess, navigate, setUsername, setPassword, setRoles);

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='form__title-row'>
          <h2>{UI.BS.PAGE.USER.TABLE.titleEdit}</h2>
          <div className='form__action-buttons'>
            <button
              className='icon-button'
              title='Save'
              onClick={handleSaveExistingUser(
                updateUser,
                user.id,
                username,
                password,
                roles,
                active
              )}
              disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className='icon-button'
              title='Delete'
              onClick={handleDeleteUser(deleteUser, user.id)}>
              <FontAwesomeIcon icon={faTrashCan} />
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
          <span className='nowrap'> {UI.BS.PAGE.USER.TABLE.passwordRuleEmpty}</span>
          <span className='nowrap'> {UI.BS.PAGE.USER.TABLE.passwordRule}</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePasswordChange(setPassword)}
        />

        <label className='form__label form__checkbox-container' htmlFor='user-active'>
          {UI.BS.PAGE.USER.TABLE.active}
          <input
            className='form__checkbox'
            id='user-active'
            name='user-active'
            type='checkbox'
            checked={active}
            onChange={handleToggleActive(setActive)}
          />
        </label>

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

export default EditUserForm;
