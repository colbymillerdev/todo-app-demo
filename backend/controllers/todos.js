const router = require('express').Router();

const Todo = require('../models/Todo');

const fetchAllEndpoint = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 'ascending' });

    // Make more readable for UI
    const response = todos.map((todo) => {
      return {
        id: todo._id,
        message: todo.message,
        createdAt: todo.createdAt,
        isCompleted: todo.isCompleted || false,
      };
    });

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const createTodoEndpoint = async (req, res, next) => {
  try {
    const { message, isCompleted } = req.body;

    const params = {
      message,
      isCompleted,
    };

    const response = await new Todo(params).save();

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

const deleteTodoEndpoint = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) res.status(404).json({ message: 'Todo not found.' });

    if (todo) todo.deleteOne({ id });

    res.status(200).json({ success: true });
  } catch (e) {
    next(e);
  }
};

router.get('/', fetchAllEndpoint);
router.post('/', createTodoEndpoint);
router.delete('/:id', deleteTodoEndpoint);

module.exports = { router };
