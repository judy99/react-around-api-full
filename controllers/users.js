const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({
      message: 'Server error: ' + err.message,
    }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(404).send({
      message: 'User not found: ' + err.message,
    }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(400).send({
      message: 'Invalid data passed for creating user: ' + err.message,
    }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
