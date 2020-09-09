const users = require('express').Router();
const { getUsers, isUserId, getUserById } = require('../controllers/users.js');

users.get('/users', getUsers);
users.get('/users/:id', isUserId);
users.get('/users/:id', getUserById);

module.exports = users;
