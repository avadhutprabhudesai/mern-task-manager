import mongoose from 'mongoose';

const { Schema } = mongoose;

const dateValidator = {
  validator: (v) => v instanceof Date && v.getTime() === v.getTime(),
  message: (props) => `Invalid value for ${props.path}`,
};

const requiredTemplate = [true, '{PATH} is required'];

const taskSchema = new Schema({
  name: {
    type: String,
    required: requiredTemplate,
    enum: {
      values: [
        'Fast Cad',
        'Box of Crayons',
        'Gob geeklords',
        'Jave Dalia',
        'Practice to Perfect',
        'Rhinestone',
        'Social Geek Made',
      ],
      message: 'Not a valid project name',
    },
  },
  status: {
    type: Number,
    required: requiredTemplate,
    enum: [0, 1, 2],
    // default: 0,
  },
  category: {
    type: String,
    required: requiredTemplate,
    enum: {
      values: [
        'UI/UX Design',
        'Website Design',
        'App Development',
        'Development',
        'Backend Development',
        'Software Testing',
        'Website Design',
        'Marketing',
        'SEO',
        'Other',
      ],
      message: 'Not a valid category',
    },
  },
  assignedTo: {
    type: String,
    required: requiredTemplate,
    enum: {
      values: [
        'Bruce Banner',
        'Peter Parker',
        'Steve Rogers',
        'Tony Stark',
        'Natasha Romanov',
        'Charles Xavier',
        'Erik Lensherr',
        'Scott Summers',
        'Logan Howlett',
      ],
      message: 'Not a valid person name',
    },
  },
  startDate: {
    type: Date,
    validate: dateValidator,
  },
  endDate: {
    type: Date,
    validate: dateValidator,
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
  description: {
    type: String,
  },
});
const Task = mongoose.model('task', taskSchema);

export default Task;
