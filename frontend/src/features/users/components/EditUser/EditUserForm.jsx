import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { DEFAULT, ROLE } from '../../../../config/common/constants';
import { TOAST, UI } from '../../../../config/common/messages';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../api/usersApiSlice';
import {
  canSaveExistingUserForm,
  generateOptionsFromRoles,
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
import Modal from '../../../../components/common/Modal';

function EditUserForm({ user, isOpen, onClose }) {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();
  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState(DEFAULT.emptyString);
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

  const validUserClass = getUsernameInputClass(validUsername);
  const validPwdClass = getPasswordInputClass(validPassword);
  const validRolesClass = getRolesInputClass(roles.length);

  useValidateUsername(username, setValidUsername);
  useValidatePassword(password, setValidPassword);
  useHandleSuccess(isSuccess, isDelSuccess, navigate, setUsername, setPassword, setRoles);

  async function handleSave(e) {
    e.preventDefault();

    const result = await handleSaveExistingUser(
      updateUser,
      user.id,
      username,
      password,
      roles,
      active
    );

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.updated);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const result = await handleDeleteUser(deleteUser, user.id);

    if (!result.success) {
      toast.error(result.errorMessage);
    } else {
      onClose();
      toast.success(TOAST.SUCCESS.USER.deleted);
    }
  }

  const modalContent = (
    <>
      <div className='backstage-header__container'>
        <h2>Edit User</h2>
        <div className='backstage-header__action-buttons'>
          <button
            className='icon-button'
            title='Save'
            onClick={handleSave}
            disabled={!canSave}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button className='icon-button' title='Delete' onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </div>
      </div>
      <form className='form' onSubmit={handleSave}>
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

export default EditUserForm;
