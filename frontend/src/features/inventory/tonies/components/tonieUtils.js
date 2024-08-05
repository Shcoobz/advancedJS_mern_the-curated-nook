import { useEffect } from 'react';
import { CLASS_NAME, DEFAULT, LINK } from '../../../../config/common/constants';
import { TOAST } from '../../../../config/common/messages';
import { toast } from 'react-toastify';
import { setDefaultValue } from '../../../utils/formUtils';

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;
  const DEFAULT = { emptyString: '' };

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

export function getNameInputClass(validName) {
  return !validName ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export async function handleSaveNewTonie(addNewTonie, formData) {
  const payload = {
    name: setDefaultValue(formData.name),
    description: setDefaultValue(formData.description),
    thumbnailUrl: setDefaultValue(formData.thumbnailUrl),
    imageUrl: setDefaultValue(formData.imageUrl),
    isOnWishlist: formData.isOnWishlist,
  };

  const response = await addNewTonie(payload);

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}

export async function handleSaveExistingTonie(updateTonie, tonie, formData) {
  const payload = {
    id: tonie.id,
    name: formData.name,
    description: formData.description,
    thumbnailUrl: formData.thumbnailUrl,
    imageUrl: formData.imageUrl,
    isOnWishlist: formData.isOnWishlist,
  };

  const response = await updateTonie(payload);

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}
