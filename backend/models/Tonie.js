import mongoose from 'mongoose';

const tonieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imgUrl: {
    type: String,
    trim: true,
  },
  isOnWishlist: {
    type: Boolean,
    default: false,
  },
});

const Tonie = mongoose.model('Tonie', tonieSchema);

export default Tonie;
