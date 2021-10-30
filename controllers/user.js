const user = require('../models/user');

const ERROR_400 = 400;
const ERROR_500 = 500;
const ERROR_404 = 404;
module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка' }));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({
      name,
      about,
      avatar,
    })
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res
          .status(ERROR_400)
          .send({ message: 'Ошибка при создании пользователя' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.getUserById = (req, res) => {
  user
    .findById(req.params.id)
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      // eslint-disable-next-line comma-dangle
      { new: true }
    )
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'SomeErrorNameAnother') {
        res.status(ERROR_400).send({ message: 'Данные некорректны' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      // eslint-disable-next-line comma-dangle
      { new: true }
    )
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'SomeErrorNameAnother') {
        res.status(ERROR_400).send({ message: 'Данные некорректны' });
      }
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};
