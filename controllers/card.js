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
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: 'Ошибка при создании карточки' });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};
module.exports.deleteCard = (req, res) => {
  card
    .findByIdAndDelete(req.params.cardId)
    .orFail(new Error('NotFound'))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_400).send({ message: 'Нет карточки по заданному id' });
      } else if (err.message === 'NotFound') {
        res.status(
          // eslint-disable-next-line comma-dangle
          ERROR_404.send({ message: 'Нет карточки по заданному id' })
        );
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
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
    .orFail(new Error('NotFound'))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_400).send({ message: 'Нет карточки по заданному id' });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: 'Данные некорректны' });
      } else if (err.message === 'NotFound') {
        res.status(
          // eslint-disable-next-line comma-dangle
          ERROR_404.send({ message: 'Нет карточки по заданному id' })
        );
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
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
    .orFail(new Error('CastError'))
    .then((like) => {
      res.status(200).send(like);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_400).send({ message: 'Нет карточки по заданному id' });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({ message: 'Данные некорректны' });
      } else if (err.message === 'NotFound') {
        res.status(
          // eslint-disable-next-line comma-dangle
          ERROR_404.send({ message: 'Нет карточки по заданному id' })
        );
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};
