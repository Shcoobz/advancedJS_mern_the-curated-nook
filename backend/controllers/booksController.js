import { INDEX } from '../config/common/constants.js';
import {
  createBookInDatabase,
  createBookObject,
  deleteBookFromDatabase,
  extractBookDetails,
  fetchAllBooksInCollection,
  fetchAllBooksOnWishlist,
  findBookById,
  findBookByIsbn,
  findBooksByIsbnExcludingId,
  saveBook,
  updateBookFields,
} from './utils/bookQueries.js';
import {
  sendBooksNotFound,
  sendBooks,
  sendTitleRequired,
  sendIsbnRequired,
  sendBookDuplicateIsbn,
  sendBookCreated,
  sendBookInvalidData,
  sendBookUpdated,
  sendIdRequired,
  sendBookDeleted,
} from './utils/response/bookResponse.js';

export async function getAllBooksInCollection(req, res) {
  const books = await fetchAllBooksInCollection();

  if (!books?.length) return sendBooksNotFound(res);

  return sendBooks(res, books);
}

export async function getAllBooksOnWishlist(req, res) {
  const books = await fetchAllBooksOnWishlist();

  if (!books?.length) return sendBooksNotFound(res);

  return sendBooks(res, books);
}

export async function createNewBook(req, res) {
  const { title, isbn } = req.body;
  if (!title) return sendTitleRequired(res);
  if (!isbn || !isbn.length) return sendIsbnRequired(res);

  const duplicate = await findBookByIsbn(isbn);

  if (duplicate) return sendBookDuplicateIsbn(res);

  const bookObject = createBookObject(req.body);

  const newBook = await createBookInDatabase(bookObject);

  // Todo: implement for all?
  if (newBook) {
    return sendBookCreated(res, newBook.title);
  } else {
    return sendBookInvalidData(res);
  }
}

export async function updateBook(req, res) {
  const { id, title, isbn } = req.body;

  if (!title) return sendTitleRequired(res);
  if (!isbn || !isbn.length) return sendIsbnRequired(res);

  const book = await findBookById(id);
  if (!book) return sendBooksNotFound(res);

  const duplicate = await findBooksByIsbnExcludingId(isbn, id);
  if (duplicate && duplicate.length > INDEX.EMPTY_ARRAY)
    return sendBookDuplicateIsbn(res);

  updateBookFields(book, req.body);

  const updatedBook = await saveBook(book);

  return sendBookUpdated(res, updatedBook.title);
}

export async function deleteBook(req, res) {
  const { id } = req.body;
  if (!id) return sendIdRequired(res);

  const book = await findBookById(id);
  if (!book) return sendBooksNotFound(res);

  const { title, bookId } = extractBookDetails(book);

  await deleteBookFromDatabase(book);

  return sendBookDeleted(res, title, bookId);
}
