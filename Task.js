import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
});
const Task = mongoose.model('task', taskSchema);

export default Task;
