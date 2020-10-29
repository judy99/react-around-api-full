const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const { showError } = require('./utils/showError');
const error = require('./middlewares/error');

const app = express();

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');
// const mid = require('./middlewares/auth.js');
// temporary workaround. All cards will have the same author.
// app.use((req, res, next) => {
//   req.user = {
//     _id: '5f6a161c35b014788c230f74',
//   };
//   next();
// });

// app.use(mid);

app.use(cardsRoute);
app.use(usersRoute);
// app.get('*', (req, res) => {
//   const e = new Error();
//   e.name = 'NotFound';
//   showError(res, e, 'Resource not found');
// });
// app.use('*', (req, res) => {
//   const e = new Error();
//   showError(res, e, 'Internal Server Error');
// });

app.use(errors()); // celebrate error handler

app.use(error); // centralized error handler

const {
  PORT = 3000,
} = process.env;
app.listen(PORT);
