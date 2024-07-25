import mongoose from 'mongoose';

const legoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Lego', legoSchema);
