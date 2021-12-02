import { Router } from 'express';

import createTask from '../controllers/taskControllers/task.post.js';
import allTask from '../controllers/taskControllers/task.get.js';
import changeTask from '../controllers/taskControllers/task.patch.js';
import deleteTask from '../controllers/taskControllers/task.delete.js';

const router = Router();
router.post('/task', createTask);
router.get('/task', allTask);
router.patch('/task/:id', changeTask);
router.delete('/task/:id', deleteTask);

export default router;