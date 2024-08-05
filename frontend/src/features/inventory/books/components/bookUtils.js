import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CLASS_NAME, DEFAULT, LINK } from '../../../../config/common/constants';
import { toast } from 'react-toastify';
import { TOAST } from '../../../../config/common/messages';
import { setDefaultDate, setDefaultValue } from '../../../utils/formUtils';

function getErrorContent(error, delError) {
  const errorMsg = error?.data?.message;
  const delErrorMsg = delError?.data?.message;
  const DEFAULT = { emptyString: '' };

  return errorMsg || delErrorMsg || DEFAULT.emptyString;
}

export function getTitleInputClass(validTitle) {
  return !validTitle ? CLASS_NAME.formIncomplete : DEFAULT.emptyString;
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
