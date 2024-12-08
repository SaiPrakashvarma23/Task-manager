const Task = require('../models/task');

class TaskService {
  // Create Task
  async createTask(data) {
    return await Task.create(data);
  }

  // Get All Tasks
  async getFilteredTasks(searchString, skip, limit, filterCriteria, sortCriteria) {
    // Create a query object for filtering and searching
    const query = {
      ...filterCriteria,
      ...(searchString ? { title: { $regex: searchString, $options: 'i' } } : {})
    };

    // Fetch tasks and total count with sorting and filtering
    const tasks = await Task.find(query).sort(sortCriteria).skip(skip).limit(limit);
    const count = await Task.countDocuments(query);

    return { tasks, count };
  }

  async getTaskByTitle(title) {
    return await Task.findOne({ title });
  }
  // Get Single Task
  async getTaskById(id) {
    return await Task.findById(id);
  }

  // Update Task
  async updateTaskById(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete Task
  async deleteTaskById(id) {
    return await Task.findByIdAndDelete(id);
  }

  async softDeleteTaskById(taskId) {
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { deletedAt: new Date() }, // Set the deletedAt field to the current date
        { new: true } // Return the updated task
      );
      return task;
    } catch (error) {
      throw new Error('Error deleting task');
    }
  }
}

module.exports = new TaskService();
