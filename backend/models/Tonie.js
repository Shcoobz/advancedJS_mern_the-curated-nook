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
});

const Tonie = mongoose.model('Tonie', tonieSchema);

export default Tonie;
