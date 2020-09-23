const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({
      message: 'Server Error'
    }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(400).send({
      message: 'Invalid data passed to the method for creating card.'
    }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((card) => res.status(200).send({ message: `Card ${card.name} was deleted` }))
    .catch((err) => res.status(500).send({
      message: 'Server Error. Can\'t delete card.'
    }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
