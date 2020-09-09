const path = require('path');
const getDataFromFile = require('../utils/getDataFromFile');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res, next) => {
  return getDataFromFile(dataPath)
    .then((usersDataFromFile) => {
      res.status(200).send(usersDataFromFile);
    })
    .catch(() => res.status(404).send({ message: 'File not found or some problems have occured while reading data from file' }))
    .finally(() => next());
};

const isUserId = (req, res, next) => {
  const { id } = req.params;
  return getDataFromFile(dataPath)
    .then((usersDataFromFile) => {
      const user = usersDataFromFile.find((item) => item._id === id);
      if (user) next();
      else res.status(404).send({ message: 'User ID not found' });
    })
    .catch(() => res.status(404).send({ message: 'File not found or some problems have occured while reading data from file' }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  return getDataFromFile(dataPath)
    .then((usersDataFromFile) => {
      const user = usersDataFromFile.find((item) => item._id === id);
      res.status(200).send(user);
    })
    .catch(() => res.status(404).send({ message: 'File not found or some problems have occured while reading data from file' }));
};

module.exports = {
  getUsers,
  isUserId,
  getUserById,
};
