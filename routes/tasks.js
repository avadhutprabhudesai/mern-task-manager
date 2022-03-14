/* eslint-disable @babel/new-cap */
import express from 'express';
import Task from '../Task.js';

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
    res.send('GET: /api/tasks');
  })
  .post(async (req, res) => {
    const { body } = req;
    const taskCreated = await Task.create({
      title: body.title,
      isDone: false,
    });
    res.json(taskCreated);
  });

taskRouter
  .route('/:id')
  .get((req, res) => {
    res.json({
      id: Number(req.params.id),
    });
  })
  .patch((req, res) => {
    res.send(`PATCH: /api/tasks/:${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE: /api/tasks/:${req.params.id}`);
  });
export default taskRouter;
