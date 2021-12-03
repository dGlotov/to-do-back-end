import { Router } from 'express';

import createTask from '../controllers/task-controllers/task.post.js';
import allTask from '../controllers/task-controllers/task.get.js';
import changeTask from '../controllers/task-controllers/task.patch.js';
import deleteTask from '../controllers/task-controllers/task.delete.js';

const router = Router();
router.post('/task', createTask);
router.get('/tasks', allTask);
router.patch('/task/:id', changeTask);
router.delete('/task/:id', deleteTask);

export default router;