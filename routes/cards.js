const cards = require('express').Router();
const getCards = require('../controllers/cards.js');

cards.get('/cards', getCards);
module.exports = cards;
