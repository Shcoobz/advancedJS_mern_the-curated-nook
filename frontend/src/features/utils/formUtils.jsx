import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CLASS_NAME, DEFAULT, LINK, REGEX } from '../../config/common/constants';
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
            titleList: data.titleList,
            description: data.description,
            thumbnailUrl: data.thumbnailUrl,
            imageUrl: data.imageUrl,
            isOnWishlist: data.isOnWishlist,
          }
        : {
            name: DEFAULT.emptyString,
            validName: false,
            titleList: DEFAULT.emptyArray,
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
            description: data.description,
            setNumber: data.setNumber,
            thumbnailUrl: data.thumbnailUrl,
            imageUrl: data.imageUrl,
            themeId: data.themeId,
            themeName: data.themeName,
            year: data.year,
            isOnWishlist: data.isOnWishlist,
          }
        : {
            name: DEFAULT.emptyString,
            validName: false,
            description: DEFAULT.emptyString,
            setNumber: DEFAULT.emptyString,
            thumbnailUrl: DEFAULT.emptyString,
            imageUrl: DEFAULT.emptyString,
            themeId: DEFAULT.emptyString,
            themeName: DEFAULT.emptyString,
            year: DEFAULT.emptyString,
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

    case 'login':
      return {
        username: '',
        password: '',
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

export function validateISBN(isbn) {
  return isbn.trim().length > 0;
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
  if (typeof value === 'string') {
    return value.trim() ? value.trim() : defaultValue;
  }

  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === 'string' ? item.trim() : defaultValue));
  }

  return defaultValue;
};

export function setDefaultDate(value) {
  return value === '' ? '1900-01-01' : value;
}

export function createUpdateField(setFormData) {
  return (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
}

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

export function getErrorMessageClass(isError, isDelError = false) {
  return isError || isDelError ? CLASS_NAME.errMsg : CLASS_NAME.offscreen;
}

export function getInputClass(validity, type = 'default') {
  if (type === 'roles') {
    return validity ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
  }

  if (type === 'isbn') {
    return validity ? DEFAULT.emptyString : CLASS_NAME.formIncomplete;
  }

  return !validity ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
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

export async function handleSaveNewEntity(addFunction, formData, generatePayload) {
  const payload = generatePayload(formData);

  const response = await addFunction(payload);

  if (response.error || response.status >= 400) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export function generateNewUserPayload(formData) {
  return {
    username: formData.username,
    password: formData.password,
    roles: formData.roles,
  };
}

export function generateNewToniePayload(formData) {
  return {
    name: setDefaultValue(formData.name),
    titleList: setDefaultValue(formData.titleList),
    description: setDefaultValue(formData.description),
    thumbnailUrl: setDefaultValue(formData.thumbnailUrl),
    imageUrl: setDefaultValue(formData.imageUrl),
    isOnWishlist: formData.isOnWishlist,
  };
}

export function generateLegoNewPayload(formData) {
  return {
    name: setDefaultValue(formData.name),
    setNumber: setDefaultValue(formData.setNumber, uuidv4()),
    thumbnailUrl: setDefaultValue(formData.thumbnailUrl),
    imageUrl: setDefaultValue(formData.imageUrl),
    themeId: setDefaultValue(formData.themeId),
    themeName: setDefaultValue(formData.themeName),
    year: setDefaultValue(formData.year),
    isOnWishlist: formData.isOnWishlist,
  };
}

export function generateNewBookPayload(formData) {
  return {
    title: setDefaultValue(formData.title),
    authors: setDefaultValue(formData.authors),
    publisher: setDefaultValue(formData.publisher),
    publishedDate: setDefaultDate(formData.publishedDate),
    description: setDefaultValue(formData.description),
    isbn: setDefaultValue(formData.isbn, uuidv4()),
    categories: setDefaultValue(formData.categories),
    thumbnailUrl: setDefaultValue(formData.thumbnailUrl),
    imageUrl: setDefaultValue(formData.imageUrl),
    language: setDefaultValue(formData.language),
    isOnWishlist: formData.isOnWishlist,
  };
}

export async function handleSaveExistingEntity(
  updateFunction,
  entity,
  formData,
  generatePayload
) {
  const payload = generatePayload(entity, formData);

  const response = await updateFunction(payload);

  if (response.error || response.status >= 400) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export function generateExistingUserPayload(user, formData) {
  const payload = {
    id: user.id,
    username: formData.username,
    roles: formData.roles,
    active: formData.active,
  };

  if (formData.password) {
    payload.password = formData.password;
  }

  return payload;
}

export function generateExistingToniePayload(tonie, formData) {
  return {
    id: tonie.id,
    name: formData.name,
    titleList: formData.titleList,
    description: formData.description,
    thumbnailUrl: formData.thumbnailUrl,
    imageUrl: formData.imageUrl,
    isOnWishlist: formData.isOnWishlist,
  };
}

export function generateExistingLegoPayload(lego, formData) {
  return {
    id: lego.id,
    name: formData.name,
    setNumber: formData.setNumber,
    thumbnailUrl: formData.thumbnailUrl,
    imageUrl: formData.imageUrl,
    themeId: formData.themeId,
    themeName: formData.themeName,
    year: formData.year,
    isOnWishlist: formData.isOnWishlist,
  };
}

export function generateExistingBookPayload(book, formData) {
  return {
    id: book.id,
    title: formData.title,
    authors: formData.authors.split(',').map((author) => author.trim()),
    publisher: formData.publisher,
    publishedDate: formData.publishedDate,
    description: formData.description,
    isbn: formData.isbn.split(',').map((isbn) => isbn.trim()),
    categories: formData.categories.split(',').map((category) => category.trim()),
    thumbnailUrl: formData.thumbnailUrl,
    imageUrl: formData.imageUrl,
    language: formData.language,
    isOnWishlist: formData.isOnWishlist,
  };
}
