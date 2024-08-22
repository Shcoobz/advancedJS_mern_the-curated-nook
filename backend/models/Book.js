import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authors: {
    type: [String],
    default: ['N/A'],
    trim: true,
  },
  publisher: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  publishedDate: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  description: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  isbn: {
    type: [String],
    trim: true,
  },
  categories: {
    type: [String],
    default: ['N/A'],
    trim: true,
  },
  thumbnailUrl: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  imageUrl: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  language: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  isOnWishlist: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
