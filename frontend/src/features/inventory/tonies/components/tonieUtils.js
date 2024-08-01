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

export function useValidateName(name, setValidName) {
  useEffect(() => {
    setValidName(name.trim().length > 0);
  }, [name, setValidName]);
}

export function useHandleTonieSuccess(
  isSuccess,
  isDelSuccess,
  navigate,
  setName,
  setDescription,
  setThumbnailUrl,
  setImageUrl,
  setIsOnWishlist
) {
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName(DEFAULT.emptyString);
      setDescription(DEFAULT.emptyString);
      setThumbnailUrl(DEFAULT.emptyString);
      setImageUrl(DEFAULT.emptyString);
      setIsOnWishlist(false);

      navigate(LINK.TONIE.viewTonies);
    }
  }, [
    isSuccess,
    isDelSuccess,
    navigate,
    setName,
    setDescription,
    setThumbnailUrl,
    setImageUrl,
    setIsOnWishlist,
  ]);
}

export function getNameInputClass(validName) {
  return !validName ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export function handleNameChange(setName) {
  return function (e) {
    setName(e.target.value);
  };
}

export function handleDescriptionChange(setDescription) {
  return function (e) {
    setDescription(e.target.value);
  };
}

export function handleThumbnailUrlChange(setThumbnailUrl) {
  return function (e) {
    setThumbnailUrl(e.target.value);
  };
}

export function handleImageUrlChange(setImageUrl) {
  return function (e) {
    setImageUrl(e.target.value);
  };
}

export function handleIsOnWishlistChange(setIsOnWishlist) {
  return function (e) {
    setIsOnWishlist((prev) => !prev);
  };
}

export const setDefaultValue = (value, defaultValue = 'N/A') => {
  return value && value.trim() ? value.trim() : defaultValue;
};

export async function handleSaveNewTonie(
  addNewTonie,
  name,
  description,
  thumbnailUrl,
  imageUrl,
  isOnWishlist
) {
  const response = await addNewTonie({
    name: name,
    description: description,
    thumbnailUrl: thumbnailUrl,
    imageUrl: imageUrl,
    isOnWishlist: isOnWishlist,
  });

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}

export async function handleSaveExistingTonie(
  updateTonie,
  tonie,
  name,
  description,
  thumbnailUrl,
  imageUrl,
  isOnWishlist
) {
  const payload = {
    id: tonie.id,
    name: name,
    description: description,
    thumbnailUrl: thumbnailUrl,
    imageUrl: imageUrl,
    isOnWishlist: isOnWishlist,
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
