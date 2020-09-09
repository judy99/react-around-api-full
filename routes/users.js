const users = require('express').Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');
let usersData;

fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  usersData = JSON.parse(data);
});

const getUsers = (req, res, next) => {
  res.status(200).json(usersData);
  next();
};

const isUserId = (req, res, next) => {
  const { id } = req.params;
  const user = usersData.find((item) => item._id === id);

  if (!user) {
    res.status(404).send({ message: 'User ID not found' });
    return;
  }
  next();
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  const user = usersData.find((item) => item._id === id);
  res.send(user);
  next();
};

users.get('/users', getUsers);
users.get('/users/:id', isUserId);
users.get('/users/:id', getUserById);

module.exports = users;
