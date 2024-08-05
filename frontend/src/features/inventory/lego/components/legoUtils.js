import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CLASS_NAME, DEFAULT, LINK } from '../../../../config/common/constants';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../config/common/messages';
import { setDefaultValue } from '../../../utils/formUtils';

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

export function useValidateName(name, updateValidationStatus) {
  useEffect(() => {
    const isValid = name.trim().length > 0;

    updateValidationStatus(isValid);
  }, [name, updateValidationStatus]);
}

export function getNameInputClass(validName) {
  return !validName ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export async function handleSaveNewLego(addNewLego, formData) {
  const payload = {
    name: setDefaultValue(formData.name),
    setNumber: setDefaultValue(formData.setNumber, uuidv4()),
    thumbnailUrl: setDefaultValue(formData.thumbnailUrl),
    imageUrl: setDefaultValue(formData.imageUrl),
    isOnWishlist: formData.isOnWishlist,
  };

  const response = await addNewLego(payload);

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}

export async function handleSaveExistingLego(updateLego, lego, formData) {
  const payload = {
    id: lego.id,
    name: formData.name,
    setNumber: formData.setNumber,
    thumbnailUrl: formData.thumbnailUrl,
    imageUrl: formData.imageUrl,
    isOnWishlist: formData.isOnWishlist,
  };

  const response = await updateLego(payload);

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}

export async function handleDeleteLego(deleteLego, legoId) {
  const response = await deleteLego({ id: legoId });

  if (response.error) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export async function handleDeleteLegoList(deleteLego, legoId) {
  const response = await deleteLego({ id: legoId });

  if (response.error) {
    toast.error(response.error.data.message);
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  toast.success(TOAST.SUCCESS.LEGO.deleted);
  return { success: true };
}

export function isUUID(string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(string);
}
