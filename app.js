const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.use(express.static(path.join(__dirname, 'public')));
// temporary workaround. All cards will have the same author.
app.use((req, res, next) => {
  req.user = {
    _id: '5f6a161c35b014788c230f74',
  };
  next();
});
app.use(cardsRoute);
app.use(usersRoute);
app.get('*', (req, res) => {
  res.status(404).send({
    message: 'Requested resource not found.',
  });
});

const {
  PORT = 3000,
} = process.env;
app.listen(PORT);
