import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import mongoose from 'mongoose';
import taskRouter from './task-router.js';

mongoose.promise = global.Promise;

const url = process.env.MONGODBURL;
try {
  await mongoose.connect(url, { useNewUrlParser: true });
} catch (error) {
  console.error('Error connecting MongoDB');
}
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/tasks', taskRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express app listening on ${port}`);
