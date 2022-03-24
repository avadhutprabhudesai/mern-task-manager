/* eslint-disable @babel/new-cap */
import express from 'express';
import Project from '../models/Project.js';
import Priority from '../models/Priority.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

const configRouter = express.Router();

configRouter.route('/').get(async (req, res) => {
  const users = await User.find({});
  const priorities = await Priority.find({});
  const categories = await Category.find({});
  const projects = await Project.find({});
  res.status(200).json({
    config: {
      users,
      projects,
      priorities,
      categories,
    },
  });
});

export default configRouter;
