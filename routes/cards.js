const cards = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards.js');

cards.get('/cards', getCards);
cards.post('/cards', createCard);
cards.delete('/cards/:id', deleteCard);

module.exports = cards;
