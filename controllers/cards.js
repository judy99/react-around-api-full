const path = require('path');
const getDataFromFile = require('../utils/getDataFromFile');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  return getDataFromFile(dataPath)
    .then((cardsDataFromFile) => {
      res.status(200).send(cardsDataFromFile);
    })
    .catch(() => res.status(404).send({ message: 'File not found or some problems have occured while reading data from file' }));
};

module.exports = getCards;
