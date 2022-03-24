import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
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

const Category = mongoose.model('category', categorySchema);

export default Category;
