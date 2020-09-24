const users = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users.js');

users.get('/users', getUsers);
users.get('/users/:id', getUserById);
users.post('/users', createUser);

module.exports = users;
