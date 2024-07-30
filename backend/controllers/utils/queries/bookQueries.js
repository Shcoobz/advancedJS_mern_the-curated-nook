import { DEFAULT } from '../../../config/common/constants.js';
import Book from '../../../models/Book.js';

export async function fetchAllBooksInCollection() {
  const books = await Book.find({ isOnWishlist: false }).lean();

  return books;
}

export async function fetchAllBooksOnWishlist() {
  const books = await Book.find({ isOnWishlist: true }).lean();

  return books;
}

export function createBookObject(book) {
  return {
    title: book.title,
    authors: book.authors || DEFAULT.EMPTY_ARRAY,
    publisher: book.publisher || DEFAULT.EMPTY_STRING,
    publishedDate: book.publishedDate || DEFAULT.EMPTY_STRING,
    description: book.description || DEFAULT.NO_DESCRIPTION,
    isbn: book.isbn,
    categories: book.categories || DEFAULT.EMPTY_ARRAY,
    thumbnail: book.thumbnail || DEFAULT.EMPTY_STRING,
    imageUrl: book.imageUrl || DEFAULT.EMPTY_STRING,
    language: book.language || DEFAULT.BOOK.LANGUAGE,
    isOnWishlist: book.isOnWishlist || DEFAULT.WISHLIST,
  };
}

export function isBookValid(book) {
  if (!book.title) return false;

  if (!book.isbn || !book.isbn.length) return false;

  return true;
}

export async function findBookByIsbn(isbn) {
  return Book.findOne({ isbn: { $in: isbn } })
    .lean()
    .exec();
}

export async function createBookInDatabase(bookObject) {
  return await Book.create(bookObject);
}

export async function saveBook(book) {
  return await book.save();
}

export async function findBookById(id) {
  return Book.findById(id).exec();
}

export async function findBooksByIsbnExcludingId(isbns, excludeId) {
  return Book.find({
    isbn: { $in: isbns },
    _id: { $ne: excludeId },
  })
    .lean()
    .exec();
}

export function updateBookFields(book, updatedFields) {
  book.title = updatedFields.title;
  book.authors = updatedFields.authors || DEFAULT.EMPTY_ARRAY;
  book.publisher = updatedFields.publisher || DEFAULT.EMPTY_STRING;
  book.publishedDate = updatedFields.publishedDate || DEFAULT.EMPTY_STRING;
  book.description = updatedFields.description || DEFAULT.NO_DESCRIPTION;
  book.isbn = updatedFields.isbn;
  book.categories = updatedFields.categories || DEFAULT.EMPTY_ARRAY;
  book.thumbnail = updatedFields.thumbnail || DEFAULT.EMPTY_STRING;
  book.imageUrl = updatedFields.imageUrl || DEFAULT.EMPTY_STRING;
  book.language = updatedFields.language || DEFAULT.BOOK.LANGUAGE;
  book.isOnWishlist = updatedFields.isOnWishlist || DEFAULT.WISHLIST;
}

export function extractBookDetails(book) {
  return {
    title: book.title,
    bookId: book._id,
  };
}

export async function deleteBookFromDatabase(book) {
  await book.deleteOne();
}
