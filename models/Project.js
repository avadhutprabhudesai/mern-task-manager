import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
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

const Project = mongoose.model('project', projectSchema);

export default Project;
