const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema(
  {
    message: { type: String, required: true },
    isCompleted: { type: Boolean },
    uuid: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('todos', Todo);
