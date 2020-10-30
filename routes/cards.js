const cards = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards.js');
const auth = require('../middlewares/auth.js');

cards.get('/cards', getCards);
cards.post('/cards', auth, createCard);
cards.delete('/cards/:id', auth, deleteCard);

module.exports = cards;
