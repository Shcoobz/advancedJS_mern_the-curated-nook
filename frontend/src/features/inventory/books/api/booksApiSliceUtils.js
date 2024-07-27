import { createEntityAdapter } from '@reduxjs/toolkit';
import { initialState } from './booksApiSlice';
import {
  LINK,
  HTTP_STATUS,
  TAG_TYPE,
  HTTP_METHOD,
} from '../../../config/common/constants';

export const booksAdapter = createEntityAdapter({});

function validateBookResponseStatus(response, result) {
  return response.status === HTTP_STATUS.SUCCESS.ok && !result.isError;
}

export function getBookQuery() {
  return {
    url: LINK.BOOK.books,
    validateStatus: validateBookResponseStatus,
  };
}

export function transformBookResponse(responseData) {
  const loadedBooks = responseData.map((book) => ({ ...book, id: book._id }));

  return booksAdapter.setAll(initialState, loadedBooks);
}

export function provideBooksTags(result) {
  if (result?.ids) {
    return [
      { type: TAG_TYPE.BOOK.type, id: TAG_TYPE.BOOK.id },
      ...result.ids.map((id) => ({ type: TAG_TYPE.BOOK.type, id })),
    ];
  } else {
    return [{ type: TAG_TYPE.BOOK.type, id: TAG_TYPE.BOOK.id }];
  }
}

export function addNewBookQuery(initialBook) {
  return {
    url: LINK.BOOK.books,
    method: HTTP_METHOD.post,
    body: { ...initialBook },
  };
}

export function updateBookQuery(initialBook) {
  return {
    url: LINK.BOOK.books,
    method: HTTP_METHOD.patch,
    body: { ...initialBook },
  };
}

export function deleteBookQuery({ id }) {
  return {
    url: LINK.BOOK.books,
    method: HTTP_METHOD.delete,
    body: { id },
  };
}

export function invalidateBooksTags() {
  return [{ type: TAG_TYPE.BOOK.type, id: TAG_TYPE.BOOK.id }];
}

export function invalidateBookTag(result, error, arg) {
  return [{ type: TAG_TYPE.BOOK.type, id: arg.id }];
}
