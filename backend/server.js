const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./lib/routes');

const app = express();
const apiPort = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
const dbUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds135540.mlab.com:35540/todo-app-demo`;
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected Successfully to MongoDB'))
  .catch((err) => console.log(err));

// Setup global router
app.use('/api/v1/', router());

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
