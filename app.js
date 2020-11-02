const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

app.use(cardsRoute);
app.use(usersRoute);
app.use(errorLogger);

app.use(errors()); // celebrate error handler
app.use(error); // centralized error handler

const {
  PORT = 3000,
} = process.env;
app.listen(PORT);
