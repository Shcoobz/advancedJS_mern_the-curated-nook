import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
    },
  ],
  publisher: String,
  publishedDate: String,
  description: {
    type: String,
    default: 'Leider keine Beschreibung verfügbar :(',
  },
  isbn: [
    {
      type: String,
    },
  ],
  categories: [
    {
      type: String,
    },
  ],
  thumbnail: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: 'de',
  },
  isOnWishlist: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Book', bookSchema);
