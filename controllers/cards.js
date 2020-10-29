const Card = require('../models/card');
const { httpStatusCode } = require('../utils/showError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new Error('Can\'t retrieve cards.');
      }
      return res.status(httpStatusCode.OK).send(cards);
    })
    // .catch((err) => showError(res, err));
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new Error('Can\'t create a card.');
      }
      return res.status(httpStatusCode.OK).send({ data: card });
    })
    // .catch((err) => showError(res, err, 'Can\'t create a card.'));
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (!card) {
        throw new Error('Can\'t delete a card.');
      }
      return res.status(httpStatusCode.OK).send({ message: 'Card was deleted' });
    })
    // .catch((err) => showError(res, err, 'Can\'t delete a card.'));
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
