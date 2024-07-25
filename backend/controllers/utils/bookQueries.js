import Book from '../../models/Book.js';

export async function findAllBooksInCollection() {
  const books = await Book.find({ isOnWishlist: false }).lean();

  return books;
}

export async function findAllBooksOnWishlist() {
  const books = await Book.find({ isOnWishlist: true }).lean();

  return books;
}

// Todo: make default const
export function createBookObject(book) {
  return {
    title: book.title,
    authors: book.authors || [],
    publisher: book.publisher || '',
    publishedDate: book.publishedDate || '',
    description: book.description || 'Leider keine Beschreibung verfügbar :(',
    isbn: book.isbn,
    categories: book.categories || [],
    thumbnail: book.thumbnail || '',
    imageUrl: book.imageUrl || '',
    language: book.language || 'de',
    isOnWishlist: book.isOnWishlist || false,
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

// Todo: add constants for defaults
export function updateBookFields(book, updatedFields) {
  book.title = updatedFields.title;
  book.authors = updatedFields.authors || [];
  book.publisher = updatedFields.publisher || '';
  book.publishedDate = updatedFields.publishedDate || '';
  book.description =
    updatedFields.description || 'Leider keine Beschreibung verfügbar :(';
  book.isbn = updatedFields.isbn;
  book.categories = updatedFields.categories || [];
  book.thumbnail = updatedFields.thumbnail || '';
  book.imageUrl = updatedFields.imageUrl || '';
  book.language = updatedFields.language || 'de';
  book.isOnWishlist = updatedFields.isOnWishlist || false;
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
