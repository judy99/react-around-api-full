const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization Required.');
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'some-secret-key', (err, payload) => {
    if (err) {
      throw new AuthError('Authorization Error.');
    } else {
      req.user = payload;
    }
  });

  next(); // sending the request to the next middleware
};
