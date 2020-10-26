const users = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
} = require('../controllers/users.js');

users.get('/users', getUsers);
users.get('/users/:id', getUserById);
// users.post('/users', createUser);
users.post('/signup', createUser);
users.post('/signin', login);
users.patch('/users/me', updateUserProfile);
users.patch('/users/me/avatar', updateUserAvatar);

module.exports = users;
