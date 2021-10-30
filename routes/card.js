const cardRouter = require('express').Router();
const {
  createCard,
  deleteCard,
  getCards,
  like,
  dislike,
} = require('../controllers/card');

cardRouter.post('/cards', createCard);
cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', like);
cardRouter.delete('/cards/:cardId/likes', dislike);

module.exports = cardRouter;
