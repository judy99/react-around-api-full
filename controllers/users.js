const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({
      message: 'Server Error'
    }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(404).send({ message: 'User Not Found' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: 'Invalid data passed for creating user' }));
};

module.exports = {
  getUsers,
  // isUserId,
  getUserById,
  createUser,
};


// const path = require('path');
// const getDataFromFile = require('../utils/getDataFromFile');
//
// const dataPath = path.join(__dirname, '..', 'data', 'users.json');
//
// const getUsers = (req, res, next) => {
//   return getDataFromFile(dataPath)
//     .then((usersDataFromFile) => {
//       res.status(200).send(usersDataFromFile);
//     })
//     .catch(() => res.status(500).send({ message: 'File not found or some problems have occured while reading data from file' }))
//     .finally(() => next());
// };
//
// const isUserId = (req, res, next) => {
//   const { id } = req.params;
//   return getDataFromFile(dataPath)
//     .then((usersDataFromFile) => {
//       const user = usersDataFromFile.find((item) => item._id === id);
//       if (user) next();
//       else res.status(404).send({ message: 'User ID not found' });
//     })
//     .catch(() => res.status(500).send({ message: 'File not found or some problems have occured while reading data from file' }));
// };
//
// const getUserById = (req, res) => {
//   const { id } = req.params;
//   return getDataFromFile(dataPath)
//     .then((usersDataFromFile) => {
//       const user = usersDataFromFile.find((item) => item._id === id);
//       res.status(200).send(user);
//     })
//     .catch(() => res.status(500).send({ message: 'File not found or some problems have occured while reading data from file' }));
// };
