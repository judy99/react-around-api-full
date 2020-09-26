const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { showError } = require('./utils/showError');

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

// temporary workaround. All cards will have the same author.
app.use((req, res, next) => {
  req.user = {
    _id: '5f6a161c35b014788c230f74',
  };
  next();
});
app.use(cardsRoute);
app.use(usersRoute);
app.use('*', (req, res) => {
  const e = new Error();
  showError(res, e, 'Internal Server Error');
});

const {
  PORT = 3000,
} = process.env;
app.listen(PORT);
