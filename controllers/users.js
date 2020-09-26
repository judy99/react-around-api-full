const User = require('../models/user');
const {
  showError,
  httpStatusCode,
  // notFoundError,
} = require('../utils/showError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(httpStatusCode.OK).send(users))
    .catch((err) => showError(res, err, 'Requested resource does not exist.'));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => res.status(httpStatusCode.OK).send(users))
    .catch((err) => showError(res, err, 'There is no such user.'));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err, 'Can\'t create user.'));
};

const updateUserProfile = (req, res) => {
  const {
    name: newName = req.body.name,
    about: newAbout = req.body.about,
  } = req.body;
  const { _id: id } = req.user;
  User.findOneAndUpdate(id, { name: newName, about: newAbout }, { runValidators: true })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err, 'Can\'t update user profile.'));
};

const updateUserAvatar = (req, res) => {
  const { _id: id } = req.user;
  const { avatar: newAvatar } = req.body;
  User.findOneAndUpdate(id, { avatar: newAvatar }, { runValidators: true })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err, 'Can\'t update user avatar.'));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
