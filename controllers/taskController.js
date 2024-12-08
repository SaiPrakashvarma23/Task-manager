const taskService = require('../services/taskService');
const PaginationHelper = require('../utils/paginationHelper');
const SortHelper = require('../utils/sortHelper');
const FilterHelper = require('../utils/filterHelper');

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    // Check if a task with the same title already exists
    const existingTask = await taskService.getTaskByTitle(title);
    if (existingTask) {
      const error = new Error('A task with this title already exists');
      error.statusCode = 400; 
      throw error;
    }

    // Proceed to create the task if title is unique
    const task = await taskService.createTask(req.body);
    res.status(201).json({ success: true, message: 'Task created successfully', data: task });
  } catch (error) {
    next(error);
  }
};


// Get All Tasks
exports.getTasks = async (req, res, next) => {
  try {
    // Extract pagination, sorting, and filtering parameters
    const { page = 1, limit = 10, searchString = '', status, sortField,sortOrder } = req.query;
    const skip = (page - 1) * limit;
    
    const sortFieldValue = sortField || 'createdAt';
    const sortOrderValue = sortOrder || 'desc';
    // Get filter and sort criteria
    const filterCriteria = FilterHelper.getFilterCriteria(status);
    const sortCriteria = SortHelper.getSortCriteria(sortField, sortOrder);

    // Fetch filtered and sorted tasks
    const { tasks, count } = await taskService.getFilteredTasks(searchString, skip, limit, filterCriteria, sortCriteria);

    // Prepare the paginated response using PaginationHelper
    const paginationResponse = PaginationHelper.getPaginationResponse({
      page,
      count,
      limit: Number(limit),
      skip,
      data: tasks,
      data_field: 'tasks',
      message: 'Tasks retrieved successfully',
      searchString
    });

    // Send the response
    res.status(200).json(paginationResponse);
  } catch (error) {
    next(error);
  }
};


// Get Single Task
exports.getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404; 
      throw error;
    }
    res.status(200).json({ success: true,message: 'Task fetched successfully', data: task });
  } catch (error) {
    next(error);
  }
};

// Update Task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskById(req.params.id, req.body);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404; 
      throw error;
    }
    res.status(200).json({ success: true,message: 'Task updated successfully', data: task });
  } catch (error) {
    error.statusCode = 400; 
    next(error);
  }
};

// Delete Task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await taskService.deleteTaskById(req.params.id);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404; 
      throw error;
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Soft Delete Task
exports.softDeleteTask = async (req, res, next) => {
  try {
    const task = await taskService.softDeleteTaskById(req.params.id);
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, message: 'Task soft deleted successfully',data: task });
  } catch (error) {
    next(error);
  }
};