import { useEffect } from 'react';
import { CLASS_NAME, DEFAULT, LINK } from '../../../../config/common/constants';
import { TOAST } from '../../../../config/common/messages';
import { toast } from 'react-toastify';

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;
  const DEFAULT = { emptyString: '' };

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

export function createInitialFormState(tonie = null) {
  if (tonie) {
    return {
      name: tonie.name,
      validName: false,
      description: tonie.description,
      thumbnailUrl: tonie.thumbnailUrl,
      imageUrl: tonie.imageUrl,
      isOnWishlist: tonie.isOnWishlist,
    };
  } else {
    return {
      name: DEFAULT.emptyString,
      validName: false,
      description: DEFAULT.emptyString,
      thumbnailUrl: DEFAULT.emptyString,
      imageUrl: DEFAULT.emptyString,
      isOnWishlist: false,
    };
  }
}

export function useValidateName(name, updateValidationStatus) {
  useEffect(() => {
    const isValid = name.trim().length > 0;

    updateValidationStatus(isValid);
  }, [name, updateValidationStatus]);
}

export function useHandleTonieSuccess(isSuccess, isDelSuccess, navigate, setFormData) {
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setFormData(createInitialFormState());

      navigate(LINK.TONIE.viewTonies);
    }
  }, [isSuccess, isDelSuccess, navigate, setFormData]);
}

export function getNameInputClass(validName) {
  return !validName ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export const setDefaultValue = (value, defaultValue = 'N/A') => {
  return value && value.trim() ? value.trim() : defaultValue;
};

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

export async function handleDeleteTonie(deleteTonie, tonieId) {
  const response = await deleteTonie({ id: tonieId });

  if (response.error) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export async function handleDeleteTonieList(deleteTonie, tonieId) {
  const response = await deleteTonie({ id: tonieId });

  if (response.error) {
    toast.error(response.error.data.message);
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  toast.success(TOAST.SUCCESS.TONIE.deleted);
  return { success: true };
}

export function handleClick(updateField) {
  return function (event) {
    const { name, value, type, checked } = event.target;

    updateField(name, type === 'checkbox' ? checked : value);
  };
}
