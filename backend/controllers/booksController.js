import { INDEX } from '../config/common/constants.js';
import { ENTITY, FIELD } from '../config/common/messages.js';
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
} from './utils/queries/bookQueries.js';
import {
  sendDuplicateEntity,
  sendEntityCreated,
  sendEntityDeleted,
  sendEntityUpdated,
  sendFieldRequired,
  sendInvalidData,
  sendItems,
  sendNotFound,
} from './utils/response.js';

export async function getAllBooksInCollection(req, res) {
  const books = await fetchAllBooksInCollection();

  if (!books?.length) return sendNotFound(res, ENTITY.BOOK);

  return sendItems(res, books);
}

export async function getAllBooksOnWishlist(req, res) {
  const books = await fetchAllBooksOnWishlist();

  if (!books?.length) return sendNotFound(res, ENTITY.BOOK);

  return sendItems(res, books);
}

export async function createNewBook(req, res) {
  const { title, isbn } = req.body;
  if (!title) return sendFieldRequired(res, ENTITY.BOOK, FIELD.TITLE);
  if (!isbn || !isbn.length) return sendFieldRequired(res, ENTITY.BOOK, FIELD.ISBN);

  const duplicate = await findBookByIsbn(isbn);
  if (duplicate) return sendDuplicateEntity(res, ENTITY.BOOK);

  const bookObject = createBookObject(req.body);
  const newBook = await createBookInDatabase(bookObject);

  // Todo: implement for all?
  if (newBook) {
    return sendEntityCreated(res, ENTITY.BOOK, newBook.title);
  } else {
    return sendInvalidData(res, ENTITY.BOOK);
  }
}

export async function updateBook(req, res) {
  const { id, title, isbn } = req.body;
  if (!title) return sendFieldRequired(res, ENTITY.BOOK, FIELD.TITLE);
  if (!isbn || !isbn.length) return sendFieldRequired(res, ENTITY.BOOK, FIELD.ISBN);

  const book = await findBookById(id);
  if (!book) return sendNotFound(res, ENTITY.BOOK);

  const duplicate = await findBooksByIsbnExcludingId(isbn, id);
  if (duplicate && duplicate.length > INDEX.EMPTY_ARRAY)
    return sendDuplicateEntity(res, ENTITY.BOOK);

  updateBookFields(book, req.body);

  const updatedBook = await saveBook(book);

  return sendEntityUpdated(res, ENTITY.BOOK, updatedBook.title);
}

export async function deleteBook(req, res) {
  const { id } = req.body;
  if (!id) return sendFieldRequired(res, ENTITY.BOOK, FIELD.ID);

  const book = await findBookById(id);
  if (!book) return sendNotFound(res, ENTITY.BOOK);

  const { title, bookId } = extractBookDetails(book);

  await deleteBookFromDatabase(book);

  return sendEntityDeleted(res, ENTITY.BOOK, title, bookId);
}
