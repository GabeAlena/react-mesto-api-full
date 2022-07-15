/* const { NODE_ENV, JWT_SECRET } = process.env;
require('dotenv').config(); */
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

/* module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;
  return next();
}; */

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new Unauthorized('Необходима авторизация!');
  }

  let payload;

  try {
    payload = jwt.verify(authorization, 'some-secret-key');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }

  req.user = payload;
  return next();
};
