const User = require('../models/user');
const {
  showError,
  httpStatusCode,
  notFoundError,
} = require('../utils/showError');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(httpStatusCode.OK).send(users))
    .catch((err) => showError(res, err));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => {
      if (!users) {
        return showError(res, notFoundError());
      }
      return res.status(httpStatusCode.OK).send(users);
    })
    .catch((err) => showError(res, err));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err));
};

const updateUserProfile = (req, res) => {
  const {
    name: newName = req.body.name,
    about: newAbout = req.body.about,
  } = req.body;
  const { _id: id } = req.user;
  User.findByIdAndUpdate(id, { name: newName, about: newAbout })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err));
};

const updateUserAvatar = (req, res) => {
  const { _id: id } = req.user;
  const { avatar: newAvatar } = req.body;
  User.findOneAndUpdate(id, { avatar: newAvatar }, { runValidators: true })
    .then((user) => res.status(httpStatusCode.OK).send({
      data: user,
    }))
    .catch((err) => showError(res, err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
