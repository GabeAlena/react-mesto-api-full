const jwt = require('jsonwebtoken');

const payload = jwt.verify(token, 'SECRET_KEY');
