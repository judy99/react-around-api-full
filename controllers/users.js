const User = require('../models/user');
const { showError, HTTP_OK, notFoundError } = require('../utils/showError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_OK).send(users))
    .catch((err) => showError(res, err));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => {
      if (!users) {
        return showError(res, notFoundError());
      }
      return res.status(HTTP_OK).send(users);
    })
    .catch((err) => showError(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_OK).send({ data: user }))
    .catch((err) => showError(res, err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
