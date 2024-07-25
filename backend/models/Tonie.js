import mongoose from 'mongoose';

const tonieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Tonie', tonieSchema);
