const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  like,
  dislike,
} = require('../controllers/card');

cardRouter.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .regex(
          // eslint-disable-next-line comma-dangle
          /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/
        )
        .required(),
    }),
  }),
  // eslint-disable-next-line comma-dangle
  createCard
);
cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', like);
cardRouter.delete('/cards/:cardId/likes', dislike);

module.exports = cardRouter;
