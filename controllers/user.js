const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const user = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
// controllers/users.js

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((item) => res.send({ data: item }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      user.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      });
    })
    .then((item) => {
      res.status(201).send({
        item,
      });
    })
    .catch((err) => {
      next(new BadRequest(err.message));
    });
};
module.exports.getUserById = (req, res, next) => {
  user
    .findById(req.params.id)
    .orFail(new Error('NotFound'))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Нет пользователя по заданному id'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Нет пользователя по заданному id'));
      } else {
        next(err);
      }
    });
};
module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      // eslint-disable-next-line comma-dangle
      { new: true, runValidators: true }
    )
    .orFail(new Error('NotFound'))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Нет пользователя по заданному id'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Данные некорректны'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Нет пользователя по заданному id'));
      } else {
        next(err);
      }
    });
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      // eslint-disable-next-line comma-dangle
      { new: true, runValidators: true }
    )
    .orFail(new Error('NotFound'))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Нет пользователя по заданному id'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Данные некорректны'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Нет пользователя по заданному id'));
      } else {
        next(err);
      }
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  user
    .findOne({ email })
    .select('+password')
    .then((item) => {
      if (!item) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, item.password);
    })
    // eslint-disable-next-line consistent-return
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign({ _id: user.id }, 'super-strong-secret', {
        expiresIn: '7d',
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      next(new Unauthorized(err.message));
    });
};
module.exports.getCurrentUser = (req, res, next) => {
  user
    .findById(req.user._id)
    .then((item) => {
      if (!item) {
        throw new Error('Пользователь не найден');
      }
      return res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Неверный id'));
      }
      next(err);
    });
};
