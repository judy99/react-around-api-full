const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  showError,
  httpStatusCode,
} = require('../utils/showError');

const JWT_KEY = 'some-secret-key';

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(httpStatusCode.OK).send(users))
    .catch((err) => showError(res, err, 'Requested resource does not exist.'));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => {
      if (users !== null) {
        return res.status(httpStatusCode.OK).send(users);
      }
      const e = new Error();
      e.name = 'NotFound';
      showError(res, e, 'User not found.');
      return e;
    })
    .catch((err) => showError(res, err, 'User not found.'));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) {
    // if there is not email or passwod
    return res.status(400).send({ message: 'Email or password shoul not be empty.' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(403).send({ message: 'User with such email exists.' });
      }
      else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({ name, about, avatar, email, password: hash }))
          .then((newUser) => res.status(httpStatusCode.OK).send({
            data: newUser,
          }))
          .catch((err) => showError(res, err, 'Can\'t create user.'));
      }
    })
    .catch((err) => showError(res, err, 'Error.'));
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

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.status(httpStatusCode.OK).send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
