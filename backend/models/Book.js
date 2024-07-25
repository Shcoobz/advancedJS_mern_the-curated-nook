import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authors: [
    {
      type: String,
      trim: true,
    },
  ],
  publisher: {
    type: String,
    trim: true,
  },
  publishedDate: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    default: 'Leider keine Beschreibung verfügbar :(',
    trim: true,
  },
  isbn: [
    {
      type: String,
      trim: true,
    },
  ],
  categories: [
    {
      type: String,
      trim: true,
    },
  ],
  thumbnailUrl: {
    type: String,
    default: '',
    trim: true,
  },
  imageUrl: {
    type: String,
    default: '',
    trim: true,
  },
  language: {
    type: String,
    default: 'de',
    trim: true,
  },
  isOnWishlist: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
