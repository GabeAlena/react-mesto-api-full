const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  login,
  returnUser,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatarUser,
} = require('../controllers/users');

userRouter.post('/signup', createUser);
userRouter.post('/signin', login);

userRouter.get('/', getUsers);
userRouter.get('/me', returnUser);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
}), getUser);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?/),
  }),
}), updateAvatarUser);

module.exports = userRouter;
