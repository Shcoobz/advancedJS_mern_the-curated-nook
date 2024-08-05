import { useEffect } from 'react';
import { CLASS_NAME, DEFAULT, LINK, REGEX } from '../../../config/common/constants';
import { toast } from 'react-toastify';
import { TOAST } from '../../../config/common/messages';

export async function handleSaveNewUser(addNewUser, formData) {
  const payload = {
    username: formData.username,
    password: formData.password,
    roles: formData.roles,
  };

  const response = await addNewUser(payload);

  if (response.error || response.status >= 400) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export async function handleSaveExistingUser(updateUser, user, formData) {
  const payload = {
    id: user.id,
    username: formData.username,
    roles: formData.roles,
    active: formData.active,
  };

  if (formData.password) {
    payload.password = formData.password;
  }

  const response = await updateUser(payload);

  if (response.error || response.status >= 400) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export function canSaveNewUserForm(formData, isLoading) {
  return formData.roles.length && formData.validUsername && !isLoading;
}

export function canSaveExistingUserForm(formData, isLoading) {
  if (formData.password) {
    return (
      formData.roles.length &&
      formData.validUsername &&
      formData.validPassword &&
      !isLoading
    );
  } else {
    return formData.roles.length && formData.validUsername && !isLoading;
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
