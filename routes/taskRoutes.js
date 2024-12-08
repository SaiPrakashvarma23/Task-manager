const express = require('express');
const {createTask,getTasks,getTask,updateTask,deleteTask,softDeleteTask} = require('../controllers/taskController');
const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema } = require('../validators/taskValidator');
const router = express.Router();

router.post('/tasks', validate(createTaskSchema), createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.put('/tasks/:id',validate(updateTaskSchema), updateTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/soft-delete/:id', softDeleteTask);

module.exports = router;
