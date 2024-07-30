import { useEffect } from 'react';
import { CLASS_NAME, DEFAULT, LINK } from '../../../../config/common/constants';
import { v4 as uuidv4 } from 'uuid';

export function useValidateTitle(title, setValidTitle) {
  useEffect(() => {
    setValidTitle(title.trim().length > 0);
  }, [title, setValidTitle]);
}

export function useHandleBookSuccess(
  isSuccess,
  isDelSuccess,
  navigate,
  setTitle,
  setAuthors,
  setPublisher,
  setPublishedDate,
  setDescription,
  setIsbn,
  setCategories,
  setThumbnailUrl,
  setLanguage,
  setIsOnWishlist
) {
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle(DEFAULT.emptyString);
      setAuthors(DEFAULT.emptyString);
      setPublisher(DEFAULT.emptyString);
      setPublishedDate(DEFAULT.emptyString);
      setDescription(DEFAULT.emptyString);
      setIsbn(DEFAULT.emptyString);
      setCategories(DEFAULT.emptyString);
      setThumbnailUrl(DEFAULT.emptyString);
      setLanguage(DEFAULT.emptyString);
      setIsOnWishlist(false);

      navigate(LINK.BOOK.viewBooks);
    }
  }, [
    isSuccess,
    isDelSuccess,
    navigate,
    setTitle,
    setAuthors,
    setPublisher,
    setPublishedDate,
    setDescription,
    setIsbn,
    setCategories,
    setThumbnailUrl,
    setLanguage,
    setIsOnWishlist,
  ]);
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

export function handleImgUrlChange(setImgUrl) {
  return function (e) {
    setImgUrl(e.target.value);
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

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;
  const DEFAULT = { emptyString: '' };

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

export async function handleSaveNewBook(
  addNewBook,
  title,
  authors,
  publisher,
  publishedDate,
  description,
  isbn,
  categories,
  thumbnailUrl,
  imgUrl,
  language
) {
  const response = await addNewBook({
    title,
    authors: authors.split(',').map((author) => author.trim()),
    publisher,
    publishedDate,
    description,
    isbn: isbn,
    categories: categories.split(',').map((category) => category.trim()),
    thumbnailUrl,
    imgUrl,
    language,
  });

  if (response.error || response.status >= 400) {
    return {
      success: false,
      errorMessage: getErrorContent(response.error),
    };
  }

  return { success: true };
}

export async function handleSaveExistingBook(
  updateBook,
  book,
  title,
  authors,
  publisher,
  publishedDate,
  description,
  isbn,
  categories,
  thumbnailUrl,
  imgUrl,
  language,
  isOnWishlist
) {
  const payload = {
    id: book.id,
    title: title,
    authors: authors.split(',').map((author) => author.trim()),
    publisher: publisher,
    publishedDate: publishedDate,
    description: description,
    isbn: isbn.split(',').map((isbn) => isbn.trim()),
    categories: categories.split(',').map((category) => category.trim()),
    thumbnailUrl: thumbnailUrl,
    imgUrl: imgUrl,
    language: language,
    isOnWishlist: isOnWishlist,
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
