import mongoose from 'mongoose';

const legoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Lego = mongoose.model('Lego', legoSchema);

export default Lego;
