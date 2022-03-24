import mongoose from 'mongoose';

const { Schema } = mongoose;

const prioritySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: '#cccccc',
  },
  textColor: {
    type: String,
    default: '#000000',
  },
});

const Priority = mongoose.model('priority', prioritySchema);

export default Priority;
