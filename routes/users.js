const { celebrate, Joi } = require('celebrate');
const users = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
} = require('../controllers/users.js');
const auth = require('../middlewares/auth.js');

users.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

users.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

users.get('/users', auth, getUsers);
users.get('/users/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
}), getUserById);
// get token and verify
// users.get('/users/me', );

// users.post('/users', createUser);
users.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

users.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
  }),
}), updateUserAvatar);

module.exports = users;
