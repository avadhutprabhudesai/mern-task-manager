import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isDone: Boolean,
});
const Task = mongoose.model('task', taskSchema);

export default Task;
