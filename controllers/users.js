const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  // showError,
  httpStatusCode,
} = require('../utils/showError');
const { NotFoundError } = require('../errors/not-found-err');
const { BadReqError } = require('../errors/bad-req-err');
const { AuthError } = require('../errors/auth-err');

const JWT_KEY = 'some-secret-key';

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('No users found.');
      }
      return res.status(httpStatusCode.OK).send(users);
    })
    // .then((users) => res.status(httpStatusCode.OK).send(users))
    // .catch((err) => showError(res, err, 'Requested resource does not exist.'));
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  console.log('req.params=', req.params);
  const { id } = req.params;
  User.findById(id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('No user with matching ID found');
      }

      return res.status(httpStatusCode.OK).send(users);
      // const e = new Error();
      // e.name = 'NotFound';
      // showError(res, e, 'User not found.');
      // return e;
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) {
    // if there is not email or passwod
    throw new BadReqError('Email or password should not be empty.');
    // return res.status(400).send({ message: 'Email or password shoud not be empty.' });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new BadReqError('User with such email exists.');
        // res.status(403).send({ message: 'User with such email exists.' });
      }
      else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({ name, about, avatar, email, password: hash }))
          .then((newUser) => {
            if (!newUser) {
              throw new Error('Can\'t create user.');
            }
            return res.status(httpStatusCode.OK).send({ data: newUser });
          });
      // .catch((err) => showError(res, err, 'Can\'t create user.'));
      }
    })
    // .catch((err) => showError(res, err, 'Error.'));
    .catch((err) => next(err));
};

const updateUserProfile = (req, res, next) => {
  const {
    name: newName = req.body.name,
    about: newAbout = req.body.about,
  } = req.body;
  const { _id: id } = req.user;
  User.findOneAndUpdate(id, { name: newName, about: newAbout }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new Error('Can\'t update user profile.');
      }
      return res.status(httpStatusCode.OK).send({ data: user });
    })
    // .catch((err) => showError(res, err, 'Can\'t update user profile.'));
    .catch((err) => next(err));
};

const updateUserAvatar = (req, res, next) => {
  const { _id: id } = req.user;
  const { avatar: newAvatar } = req.body;
  User.findOneAndUpdate(id, { avatar: newAvatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new Error('Can\'t update user avatar.');
      }
      return res.status(httpStatusCode.OK).send({ data: user });
    })
    // .catch((err) => showError(res, err, 'Can\'t update user avatar.'));
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      if (!user) {
        throw new AuthError('Authentication error.Can\'t find user.');
      }
      // we're creating a token
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      res.status(httpStatusCode.OK).send({ token });
    })
    // .catch((err) => res.status(401).send({ message: err.message }));
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
