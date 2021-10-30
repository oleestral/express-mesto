const userRouter = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/user');

userRouter.post('/users', createUser);
userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.patch('/users/me', updateUserInfo);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
