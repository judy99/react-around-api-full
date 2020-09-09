const cards = require('express').Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/cards.json');
let cardsData;

fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  cardsData = JSON.parse(data);
});

const getCards = (req, res) => {
  res.status(200).json(cardsData);
};

cards.get('/cards', getCards);

module.exports = cards;
