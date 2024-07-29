import { useEffect } from 'react';
import { CLASS_NAME, DEFAULT, LINK, REGEX } from '../../../config/common/constants';

export function useValidateUsername(username, setValidUsername) {
  useEffect(() => {
    setValidUsername(REGEX.checkUsername.test(username));
  }, [username, setValidUsername]);
}

export function useValidatePassword(password, setValidPassword) {
  useEffect(() => {
    setValidPassword(REGEX.checkPassword.test(password));
  }, [password, setValidPassword]);
}

export function useHandleSuccess(
  isSuccess,
  isDelSuccess,
  navigate,
  setUsername,
  setPassword,
  setRoles
) {
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername(DEFAULT.emptyString);
      setPassword(DEFAULT.emptyString);
      setRoles(DEFAULT.emptyArray);
      navigate(LINK.USER.viewUsers);
    }
  }, [isSuccess, isDelSuccess, navigate, setUsername, setPassword, setRoles]);
}

export function handleUsernameChange(setUsername) {
  return function (e) {
    setUsername(e.target.value);
  };
}

export function handlePasswordChange(setPassword) {
  return function (e) {
    setPassword(e.target.value);
  };
}

export function handleRolesChange(setRoles) {
  return function (e) {
    const values = Array.from(
      e.target.selectedOptions /* HTML Collection */,
      (option) => option.value
    );

    setRoles(values);
  };
}

export function handleToggleActive(setActive) {
  return function () {
    return setActive((prev) => !prev);
  };
}

export function handleSaveNewUser(addNewUser, canSave, username, password, roles) {
  return async function (e) {
    e.preventDefault();

    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };
}

export function handleSaveExistingUser(
  updateUser,
  userId,
  username,
  password,
  roles,
  active
) {
  return async function (e) {
    e.preventDefault();

    const payload = {
      id: userId,
      username: username,
      roles: roles,
      active: active,
    };

    if (password) {
      payload.password = password;
    }

    await updateUser(payload);
  };
}

export function handleDeleteUser(deleteUser, userId) {
  return async function () {
    await deleteUser({ id: userId });
  };
}

export function canSaveNewUserForm(rolesCount, validUsername, validPassword, isLoading) {
  return [rolesCount, validUsername, validPassword].every(Boolean) && !isLoading;
}

export function canSaveExistingUserForm(
  rolesCount,
  validUsername,
  validPassword,
  isLoading,
  password
) {
  if (password) {
    return [rolesCount, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    return [rolesCount, validUsername].every(Boolean) && !isLoading;
  }
}

export function generateOptionsFromRoles(roles) {
  return Object.values(roles).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));
}

export function getErrorMessageClass(isError, isDelError = false) {
  return isError || isDelError ? CLASS_NAME.errMsg : CLASS_NAME.offscreen;
}

export function getUsernameInputClass(validUsername) {
  return !validUsername ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export function getPasswordInputClass(validPassword) {
  return !validPassword ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export function getRolesInputClass(rolesLength) {
  return rolesLength ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;

  const delErrorMsg = delError?.data?.message;

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}
