const Joi = require('joi');

// Schema for Create Task
const createTaskSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().optional().allow(''),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').default('TODO'),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').required().messages({
    'string.empty': 'Priority is required',
  }),
  dueDate: Joi.date().optional(),
});


// Schema for Update Task
const updateTaskSchema = Joi.object({
  title: Joi.string().max(100).optional().messages({
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().optional().allow(''),
  status: Joi.string().valid('TODO', 'IN_PROGRESS', 'COMPLETED').optional(),
  priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional(),
  dueDate: Joi.date().optional(),
}).or('title', 'description', 'status', 'priority', 'dueDate').messages({
  'object.missing': 'At least one field is required to update the task',
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
