import mongoose from 'mongoose';

const legoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  setNumber: [
    {
      type: String,
      trim: true,
    },
  ],
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
  themeId: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  themeName: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  year: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  isOnWishlist: {
    type: Boolean,
    default: false,
  },
});

const Lego = mongoose.model('Lego', legoSchema);

export default Lego;
