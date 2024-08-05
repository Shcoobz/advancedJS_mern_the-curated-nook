import { useEffect } from 'react';
import { DEFAULT, LINK, REGEX } from '../../config/common/constants';
import { toast } from 'react-toastify';

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;
  const DEFAULT = { emptyString: '' };

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

export function createInitialFormState(type, data = null) {
  switch (type) {
    case 'user':
      return data
        ? {
            username: data.username,
            validUsername: false,
            password: '',
            validPassword: false,
            roles: data.roles,
            active: data.active,
          }
        : {
            username: DEFAULT.emptyString,
            validUsername: false,
            password: DEFAULT.emptyString,
            validPassword: false,
            roles: ['User'],
            active: true,
          };

    case 'tonie':
      return data
        ? {
            name: data.name,
            validName: false,
            description: data.description,
            thumbnailUrl: data.thumbnailUrl,
            imageUrl: data.imageUrl,
            isOnWishlist: data.isOnWishlist,
          }
        : {
            name: DEFAULT.emptyString,
            validName: false,
            description: DEFAULT.emptyString,
            thumbnailUrl: DEFAULT.emptyString,
            imageUrl: DEFAULT.emptyString,
            isOnWishlist: false,
          };

    case 'lego':
      return data
        ? {
            name: data.name,
            validName: false,
            setNumber: data.setNumber,
            thumbnailUrl: data.thumbnailUrl,
            imageUrl: data.imageUrl,
            isOnWishlist: data.isOnWishlist,
          }
        : {
            name: DEFAULT.emptyString,
            validName: false,
            setNumber: DEFAULT.emptyString,
            thumbnailUrl: DEFAULT.emptyString,
            imageUrl: DEFAULT.emptyString,
            isOnWishlist: false,
          };

    case 'book':
      return data
        ? {
            title: data.title,
            validTitle: false,
            authors: data.authors.join(', '),
            publisher: data.publisher,
            publishedDate: data.publishedDate,
            description: data.description,
            isbn: data.isbn.join(', '),
            categories: data.categories.join(', '),
            thumbnailUrl: data.thumbnailUrl,
            imageUrl: data.imageUrl,
            language: data.language,
            isOnWishlist: data.isOnWishlist,
          }
        : {
            title: DEFAULT.emptyString,
            validTitle: false,
            authors: DEFAULT.emptyString,
            publisher: DEFAULT.emptyString,
            publishedDate: DEFAULT.emptyString,
            description: DEFAULT.emptyString,
            isbn: DEFAULT.emptyString,
            categories: DEFAULT.emptyString,
            thumbnailUrl: DEFAULT.emptyString,
            imageUrl: DEFAULT.emptyString,
            language: DEFAULT.emptyString,
            isOnWishlist: false,
          };

    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

export function useValidate(value, validateFn, updateValidationStatus) {
  useEffect(() => {
    const isValid = validateFn(value);
    updateValidationStatus(isValid);
  }, [value, validateFn, updateValidationStatus]);
}

export function validateUsername(username) {
  return REGEX.checkUsername.test(username);
}

export function validatePassword(password) {
  return REGEX.checkPassword.test(password);
}

export function validateName(name) {
  return name.trim().length > 0;
}

export function validateTitle(title) {
  return title.trim().length > 0;
}

export function useHandleSuccess(type, isSuccess, isDelSuccess, navigate, setFormData) {
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setFormData(createInitialFormState(type));

      let link;
      switch (type) {
        case 'user':
          link = LINK.USER.viewUsers;
          break;
        case 'tonie':
          link = LINK.TONIE.viewTonies;
          break;
        case 'lego':
          link = LINK.LEGO.viewLego;
          break;
        case 'book':
          link = LINK.BOOK.viewBooks;
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }

      navigate(link);
    }
  }, [isSuccess, isDelSuccess, navigate, setFormData, type]);
}

export const setDefaultValue = (value, defaultValue = 'N/A') => {
  return value && value.trim() ? value.trim() : defaultValue;
};

export function setDefaultDate(value) {
  return value === '' ? '1900-01-01' : value;
}

export const createUpdateField = (setFormData) => (field, value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
};

export function handleClick(updateField) {
  return function (event) {
    const { name, type, options, checked, value } = event.target;

    if (type === 'select-multiple') {
      const values = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      updateField(name, values);
    } else {
      updateField(name, type === 'checkbox' ? checked : value);
    }
  };
}

export async function handleDeleteEntity(deleteFunction, entityId) {
  const response = await deleteFunction({ id: entityId });

  if (response.error) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export async function handleDeleteEntityList(deleteFunction, entityId, successMessage) {
  const response = await deleteFunction({ id: entityId });

  if (response.error) {
    toast.error(response.error.data.message);
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  toast.success(successMessage);
  return { success: true };
}

export function isUUID(string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(string);
}
