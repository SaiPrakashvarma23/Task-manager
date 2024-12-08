const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'],
    default: 'TODO',
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    required: true,
  },
  dueDate: {
    type: Date,
  },
  deletedAt: {
    type: Date,
    default: null, // If the task is not deleted, this field will be null
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
