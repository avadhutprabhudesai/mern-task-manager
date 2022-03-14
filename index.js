import 'dotenv/config';
import mongoose from 'mongoose';
import app from './server.js';

mongoose.promise = global.Promise;

const url = process.env.MONGODBPROD;
try {
  await mongoose.connect(url, { useNewUrlParser: true });
} catch (error) {
  console.error('Error connecting MongoDB');
}

const port = process.env.PORT || 5000;
app.listen(port);
