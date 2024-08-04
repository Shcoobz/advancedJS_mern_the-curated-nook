import { useEffect } from 'react';
import { CLASS_NAME, DEFAULT, LINK } from '../../../../config/common/constants';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../config/common/messages';

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

export function useValidateName(name, setValidName) {
  useEffect(() => {
    setValidName(name.trim().length > 0);
  }, [name, setValidName]);
}

export function useHandleLegoSuccess(
  isSuccess,
  isDelSuccess,
  navigate,
  setName,
  setSetNumber,
  setThumbnailUrl,
  setImageUrl,
  setIsOnWishlist
) {
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName(DEFAULT.emptyString);
      setSetNumber(DEFAULT.emptyString);
      setThumbnailUrl(DEFAULT.emptyString);
      setImageUrl(DEFAULT.emptyString);
      setIsOnWishlist(false);

      navigate(LINK.LEGO.viewLego);
    }
  }, [
    isSuccess,
    isDelSuccess,
    navigate,
    setName,
    setSetNumber,
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

export function handleSetNumberChange(setSetNumber) {
  return function (e) {
    setSetNumber(e.target.value);
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

export async function handleSaveNewLego(
  addNewLego,
  name,
  setNumber,
  thumbnailUrl,
  imageUrl,
  isOnWishlist
) {
  const response = await addNewLego({
    name: name,
    setNumber: setNumber,
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

export async function handleSaveExistingLego(
  updateLego,
  lego,
  name,
  setNumber,
  thumbnailUrl,
  imageUrl,
  isOnWishlist
) {
  const payload = {
    id: lego.id,
    name: name,
    setNumber: setNumber,
    thumbnailUrl: thumbnailUrl,
    imageUrl: imageUrl,
    isOnWishlist: isOnWishlist,
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
