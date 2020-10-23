const users = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users.js');

users.get('/users', getUsers);
users.get('/users/:id', getUserById);
// users.post('/users', createUser);
users.post('/signup', createUser);
users.patch('/users/me', updateUserProfile);
users.patch('/users/me/avatar', updateUserAvatar);

module.exports = users;
