import mongoose from 'mongoose';

const tonieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  titleList: {
    type: [String],
    default: ['N/A'],
    trim: true,
  },
  description: {
    type: String,
    default: 'N/A',
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
  isOnWishlist: {
    type: Boolean,
    default: false,
  },
});

const Tonie = mongoose.model('Tonie', tonieSchema);

export default Tonie;
