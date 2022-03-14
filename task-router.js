/* eslint-disable @babel/new-cap */
import express from 'express';
import Task from './Task.js';

/**
 * GET: /api/tasks
 * POST: /api/tasks
 * GET: /api/tasks/:id
 * PATCH: /api/tasks/:id
 * DELETE: /api/tasks/:id
 */
const taskRouter = express.Router();

taskRouter
  .route('/')
  .get((req, res) => {
    console.log('GET: /api/tasks');
    res.send('GET: /api/tasks');
  })
  .post(async (req, res) => {
    console.log('POST: /api/tasks');
    const { body } = req;
    await Task.create({
      title: body.title,
      isDone: false,
    });
    res.send('POST: /api/tasks');
  });

taskRouter
  .route('/:id')
  .get((req, res) => {
    console.log('GET: /api/tasks/:id', req.params.id);
    res.send('GET: /api/tasks/:id');
  })
  .patch((req, res) => {
    console.log('PATCH: /api/tasks/:id', req.params.id);
    res.send('PATCH: /api/tasks/:id');
  })
  .delete((req, res) => {
    console.log('DELETE: /api/tasks/:id', req.params.id);
    res.send('DELETE: /api/tasks/:id');
  });
export default taskRouter;
