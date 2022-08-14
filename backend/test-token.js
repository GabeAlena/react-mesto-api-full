const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNiZjAwMzA0ZGU1NDRiYjlhMDg2MjAiLCJpYXQiOjE2NjA0NTg2OTUsImV4cCI6MTY2MTA2MzQ5NX0.3F28BnMpqWc-GbSHywAJIiF474eTk60cMid3qT5GG9k';
const payload = jwt.verify(token, 'SECRET_KEY');
