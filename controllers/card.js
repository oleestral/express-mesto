const card = require('../models/card');

const ERROR_400 = 400;
const ERROR_500 = 500;
const ERROR_404 = 404;
module.exports.getCards = (req, res) => {
  card
    .find({})
    .then((item) => res.send(item))
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка' }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  card
    .create({
      name,
      link,
      owner: req.user._id,
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_400).send({ message: 'Ошибка при создании карточки' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.deleteCard = (req, res) => {
  card
    .findByIdAndDelete(req.params.cardId)
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_404).send({ message: 'Карточка не найдена' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.like = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      // eslint-disable-next-line comma-dangle
      { new: true }
    )
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_404).send({ message: 'Карточка не найдена' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.dislike = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id },
      },
      // eslint-disable-next-line comma-dangle
      { new: true }
    )
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_404).send({ message: 'Карточка не найдена' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
