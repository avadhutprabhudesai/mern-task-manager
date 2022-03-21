/* eslint-disable @babel/new-cap */
import express from 'express';
import Task from '../models/Task.js';

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
  .post(async (req, res, next) => {
    const { body } = req;
    try {
      const created = await Task.create(body);
      res.json(created);
    } catch (error) {
      next(error);
    }
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

// eslint-disable-next-line no-unused-vars
taskRouter.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const { errors } = err;
    const errorOutput = {};
    for (let key of Object.keys(errors)) {
      if (errors[key].name === 'CastError') {
        let path = errors[key].path;
        errorOutput[path] = `Invalid format for ${path}`;
      } else {
        errorOutput[key] = errors[key].properties.message;
      }
    }
    res.status(400).json(errorOutput);
  }
});
export default taskRouter;
