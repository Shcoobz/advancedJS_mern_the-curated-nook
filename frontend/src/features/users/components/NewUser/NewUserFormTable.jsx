import { SaveButton, SubmitButton } from '../../../../components/common/Buttons';
import { ROLE } from '../../../../config/common/constants';
import { UI } from '../../../../config/common/messages';
import {
  generateOptionsFromRoles,
  getPasswordInputClass,
  getRolesInputClass,
  getUsernameInputClass,
  handlePasswordChange,
  handleRolesChange,
  handleUsernameChange,
} from '../userUtils';

function NewUserFormTable({
  username,
  setUsername,
  validUsername,
  password,
  setPassword,
  validPassword,
  roles,
  setRoles,
  canSave,
  handleSave,
}) {
  const validUserClass = getUsernameInputClass(validUsername);
  const validPwdClass = getPasswordInputClass(validPassword);
  const validRolesClass = getRolesInputClass(roles.length);
  const options = generateOptionsFromRoles(ROLE);

  const modalContent = (
    <>
      <div className='form-header__container'>
        <h2>Create New User</h2>
        <div className='form-header__action-buttons'>
          <SaveButton handleSave={handleSave} canSave={canSave} />
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
          className='form__select'
          multiple={true}
          size='3'
          value={roles}
          onChange={handleRolesChange(setRoles)}>
          {options}
        </select>

        <SubmitButton canSave={canSave} />
      </form>
    </>
  );

  return modalContent;
}

export default NewUserFormTable;
