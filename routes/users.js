const users = require('express').Router();
const { getUsers, getUserById, createUser, updateUserProfile } = require('../controllers/users.js');

users.get('/users', getUsers);
users.get('/users/:id', getUserById);
users.post('/users', createUser);
// PATCH /users/me — update profile
users.patch('/users/me', updateUserProfile);

module.exports = users;
