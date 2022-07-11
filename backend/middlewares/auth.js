const { NODE_ENV, JWT_SECRET } = process.env;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { cookies } = req;

  if (!cookies) {
    return next(new Unauthorized('Необходима авторизация!'));
  }

  const token = cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

/* module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new Unauthorized('Необходима авторизация!');
  }

  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;
  return next();
}; */
