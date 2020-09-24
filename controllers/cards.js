const Card = require('../models/card');
const { showError, httpStatusCode } = require('../utils/showError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(httpStatusCode.OK).send(cards))
    .catch((err) => showError(res, err));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(httpStatusCode.OK).send({ data: card }))
    .catch((err) => showError(res, err));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(() => res.status(httpStatusCode.OK).send({
      message: 'Card was deleted',
    }))
    .catch((err) => showError(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
