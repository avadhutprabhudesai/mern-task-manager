import mongoose from 'mongoose';

const { Schema } = mongoose;

export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userSchema);

export default User;
