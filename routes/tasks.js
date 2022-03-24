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

const populateConfig = {
  project: {
    path: 'project',
    model: 'project',
    select: ['name', 'bgColor', 'textColor'],
  },
  category: {
    path: 'category',
    model: 'category',
    select: ['name', 'bgColor', 'textColor'],
  },
  priority: {
    path: 'priority',
    model: 'priority',
    select: ['name', 'bgColor', 'textColor'],
  },
  users: {
    path: 'users',
    model: 'user',
    select: ['name', 'avatar'],
  },
};

taskRouter
  .route('/')
  .get(async (req, res) => {
    const tasks = await Task.find()
      .populate(populateConfig.project)
      .populate(populateConfig.category)
      .populate(populateConfig.priority)
      .populate(populateConfig.users);

    res.json(tasks);
  })
  .post(async (req, res, next) => {
    const { body } = req;
    try {
      let created = await Task.create(body);
      created = await created
        .populate(populateConfig.project)
        .then((c) => c.populate(populateConfig.category))
        .then((c) => c.populate(populateConfig.priority))
        .then((c) => c.populate(populateConfig.users));
      res.json(created);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Task.deleteMany();
      res.status(200).send('All tasks deleted successfully');
    } catch (error) {
      next(error);
    }
  });

taskRouter
  .route('/:id')
  .get(async (req, res) => {
    const task = await Task.findById(req.params.id)
      .populate(populateConfig.project)
      .populate(populateConfig.category)
      .populate(populateConfig.priority)
      .populate(populateConfig.users);

    res.json(task);
  })
  .patch(async (req, res) => {
    const {
      params: { id },
      body,
    } = req;
    let task = await Task.findById(id);

    for (const [key, value] of Object.entries(body)) {
      task[key] = value;
    }
    task = await task.save();
    res.status(200).json(task);
  })
  .delete(async (req, res) => {
    const {
      params: { id },
    } = req;
    const deleted = await Task.findByIdAndDelete(id);

    res.status(200).json(deleted);
  });

// eslint-disable-next-line no-unused-vars
taskRouter.use((err, req, res, next) => {
  console.log(err);
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
