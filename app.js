const express = require('express');
const path = require('path');

const app = express();

const cardsRoute = require('./routes/cards');
const usersRoute = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cardsRoute);
app.use(usersRoute);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

const { PORT = 3000 } = process.env;
app.listen(PORT);
