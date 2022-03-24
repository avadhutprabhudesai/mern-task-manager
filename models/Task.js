import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'project' },
  category: { type: Schema.Types.ObjectId, ref: 'category' },
  priority: { type: Schema.Types.ObjectId, ref: 'priority' },
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  description: String,
  start: Date,
  end: Date,
  status: String,
});

const Task = mongoose.model('task', taskSchema);

export default Task;
