const express = require('express');

const Controllers = require('../controllers');

const router = express.Router();

module.exports = () => {
  router.use('/todos', Controllers.Todos.router);

  return router;
};
