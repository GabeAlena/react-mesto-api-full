require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { serverError } = require('./errors/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: [
    'https://localhost:3000',
    'http://localhost3000',
    'https://localhost:3001',
    'http://localhost3001',
    'https://gabealena.students.nomoredomains.xyz',
    'http://gabealena.students.nomoredomains.xyz',
    /* 'https://api.gabealena.students.nomoredomains.xyz',
  'http://api.gabealena.students.nomoredomains.xyz' */],
}));

app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-zA-Z\0-9]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use('*', (req, res, next) => next(new NotFound('Запрашиваемая страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use(serverError);

app.listen(PORT, () => {
  console.log(`Сервер на порту ${PORT} успешно запущен`);
});
