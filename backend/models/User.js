import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: [String],
    default: ['User'],
    trim: true,
  },

  active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
