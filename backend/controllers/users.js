const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const User = require('../models/User');

const createUserEndpoint = async (req, res, next) => {
  try {
    const params = { uuid: uuidv4() };
    const { uuid } = await new User(params).save();

    res.status(200).json({ uuid });
  } catch (e) {
    next(e);
  }
};

router.post('/', createUserEndpoint);

module.exports = { router };
