const mongoose = require('mongoose');
const { httpStatusCode } = require('../utils/httpCodes');
const { BadReqError } = require('../errors/bad-req-err');
const { NotFoundError } = require('../errors/not-found-err');
const { AuthError } = require('../errors/auth-err');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new Error('Can\'t retrieve cards.');
      }
      return res.status(httpStatusCode.OK).send(cards);
    })
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  if (!name || !link) {
    throw new BadReqError('Name or link should not be empty.');
  }
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new Error('Can\'t create a card.');
      }
      return res.status(httpStatusCode.OK).send({ data: card });
    })
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Card.findByIdAndDelete(id)
      .then((card) => {
        if (!card) {
          throw new NotFoundError('No card with matching ID found.');
        }
        if (req.user._id !== card.owner) {
          throw new AuthError('Not enough permission for this operation.');
        }
        return res.status(httpStatusCode.OK).send({ message: 'Card was deleted' });
      })
      .catch((err) => next(err));
  } catch (e) {
    throw new BadReqError('Can\'t delete card. Wrong ID format.');
  }
};

// TODO:
// * `PUT /cards/:cardId/likes` — like a card
// * `DELETE /cards/:cardId/likes` — unlike a card

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
