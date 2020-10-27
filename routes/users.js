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

users.post('/signup', createUser);
users.post('/signin', login);

users.get('/users', auth, getUsers);
users.get('/users/:id', auth, getUserById);
// get token and verify
// users.get('/users/me', );

// users.post('/users', createUser);
users.patch('/users/me', auth, updateUserProfile);
users.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = users;
