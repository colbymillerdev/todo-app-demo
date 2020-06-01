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
    const { message } = req.body;

    const params = {
      message,
    };

    const response = await new Todo(params).save();

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

router.get('/', fetchAllEndpoint);
router.post('/', createTodoEndpoint);

module.exports = { router };
