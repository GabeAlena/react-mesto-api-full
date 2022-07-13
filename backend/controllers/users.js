const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* const { NODE_ENV, JWT_SECRET } = process.env; */

const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');

/* создание пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Такой пользователь уже зарегистрирован');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(`Данные некорректны ${err.message}`));
      }
      return next(err);
    })
    .catch(next);
};

/* контроллер, который получает из запроса почту и пароль и проверяет их */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      }).send({
        token,
        name: user.name,
        about: user.about,
        email: user.email,
        avatar: user.avatar,
        _id: user.id,
      });
    })

  /* const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }); */
  /* const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      ); */

  /* return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
        secure: true,
      }).send({ token }); */
  /* res.send({
        token,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        _id: user.id,
      }); */
    .catch((err) => {
      if (err.name === 'Error') {
        next(new Unauthorized('Неверные почта или пароль'));
      }
    });
};

/* Получение информации о текущем пользователе */
module.exports.returnUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден!');
      }
      /* return res.send({ data: user }); */
      return res.send({
        name: user.name,
        about: user.about,
        email: user.email,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      next(err);
    });
};

/* возвращение всех пользователей */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => next(err));
};

/* возвращение пользователя по _id */
module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Данные некорректны ${err.message}. Проверьте id пользователя`));
        return;
      }
      next(err);
    });
};

/* обновляет профиль */
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Данные некорректны ${err.message}`));
        return;
      }
      next(err);
    });
};

/* обновляет аватар */
module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Данные некорректны ${err.message}`));
        return;
      }
      next(err);
    });
};
