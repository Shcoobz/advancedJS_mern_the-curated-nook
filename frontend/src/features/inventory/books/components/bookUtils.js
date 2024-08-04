import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CLASS_NAME, DEFAULT, LINK } from '../../../../config/common/constants';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../config/common/messages';

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;
  const DEFAULT = { emptyString: '' };

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

// export function useValidateTitle(title, setValidTitle) {
//   useEffect(() => {
//     setValidTitle(title.trim().length > 0);
//   }, [title, setValidTitle]);
// }

export function useValidateTitle(title, updateValidationStatus) {
  useEffect(() => {
    const isValid = title.trim().length > 0;

    updateValidationStatus(isValid);
  }, [title, updateValidationStatus]);
}

// export function useHandleBookSuccess(
//   isSuccess,
//   isDelSuccess,
//   navigate,
//   setTitle,
//   setAuthors,
//   setPublisher,
//   setPublishedDate,
//   setDescription,
//   setIsbn,
//   setCategories,
//   setThumbnailUrl,
//   setImageUrl,
//   setLanguage,
//   setIsOnWishlist
// ) {
//   useEffect(() => {
//     if (isSuccess || isDelSuccess) {
//       setTitle(DEFAULT.emptyString);
//       setAuthors(DEFAULT.emptyString);
//       setPublisher(DEFAULT.emptyString);
//       setPublishedDate(DEFAULT.emptyString);
//       setDescription(DEFAULT.emptyString);
//       setIsbn(DEFAULT.emptyString);
//       setCategories(DEFAULT.emptyString);
//       setThumbnailUrl(DEFAULT.emptyString);
//       setImageUrl(DEFAULT.emptyString);
//       setLanguage(DEFAULT.emptyString);
//       setIsOnWishlist(false);

//       navigate(LINK.BOOK.viewBooks);
//     }
//   }, [
//     isSuccess,
//     isDelSuccess,
//     navigate,
//     setTitle,
//     setAuthors,
//     setPublisher,
//     setPublishedDate,
//     setDescription,
//     setIsbn,
//     setCategories,
//     setThumbnailUrl,
//     setImageUrl,
//     setLanguage,
//     setIsOnWishlist,
//   ]);
// }

export function useHandleBookSuccess(isSuccess, isDelSuccess, navigate, setFormData) {
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setFormData({
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
      });

      navigate(LINK.BOOK.viewBooks);
    }
  }, [isSuccess, isDelSuccess, navigate, setFormData]);
}

export function getTitleInputClass(validTitle) {
  return !validTitle ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
}

export function handleTitleChange(setTitle) {
  return function (e) {
    setTitle(e.target.value);
  };
}

export function handleAuthorsChange(setAuthors) {
  return function (e) {
    setAuthors(e.target.value);
  };
}

export function handlePublisherChange(setPublisher) {
  return function (e) {
    setPublisher(e.target.value);
  };
}

export function handlePublishedDateChange(setPublishedDate) {
  return function (e) {
    setPublishedDate(e.target.value);
  };
}

export function handleDescriptionChange(setDescription) {
  return function (e) {
    setDescription(e.target.value);
  };
}

export function handleIsbnChange(setIsbn) {
  return function (e) {
    setIsbn(e.target.value);
  };
}

export function handleCategoriesChange(setCategories) {
  return function (e) {
    setCategories(e.target.value);
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

export function handleLanguageChange(setLanguage) {
  return function (e) {
    setLanguage(e.target.value);
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

export function setDefaultDate(value) {
  return value === '' ? '1900-01-01' : value;
}

export async function handleSaveNewBook(addNewBook, formData) {
  const payload = {
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

  const response = await addNewBook(payload);

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}

export async function handleSaveExistingBook(updateBook, book, formData) {
  const payload = {
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

  const response = await updateBook(payload);

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}

export async function handleDeleteBook(deleteBook, bookId) {
  const response = await deleteBook({ id: bookId });

  if (response.error) {
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  return { success: true };
}

export async function handleDeleteBookList(deleteBook, bookId) {
  const response = await deleteBook({ id: bookId });

  if (response.error) {
    toast.error(response.error.data.message);
    return { success: false, errorMessage: getErrorContent(response.error) };
  }

  toast.success(TOAST.SUCCESS.BOOK.deleted);
  return { success: true };
}

export function isUUID(string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(string);
}

export function handleClick(updateField) {
  return function (event) {
    const { name, value, type, checked } = event.target;

    console.log(`Field: ${name}, Value: ${type === 'checkbox' ? checked : value}`);

    updateField(name, type === 'checkbox' ? checked : value);
  };
}
