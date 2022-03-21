import 'dotenv/config';
import app from '../server.js';
import supertest from 'supertest';
import mongoose from 'mongoose';
import Task from '../models/Task.js';

const request = supertest(app);

beforeAll(async () => {
  mongoose.promise = global.Promise;

  const url = process.env.MONGOTEST;
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log('Connected to Test DB');
  } catch (error) {
    console.error('Error connecting MongoDB');
    console.log(error);
  }
});

afterEach(async () => {
  await Task.deleteMany();
});

describe('Testing /api/tasks', () => {
  it('GET /api/tasks', async () => {
    const res = await request.get('/api/tasks/');
    expect(res.status).toBe(200);
  });
  it('POST /api/tasks', async () => {
    const res = await request.post('/api/tasks').send({ title: 'A new task' });
    expect(res.status).toBe(200);
    const { title, isDone } = res.body;
    expect(title).toBe('A new task');
    expect(isDone).toBe(false);
  });
});
