const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors/auth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization Required.');
    // return res.status(401).send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'some-secret-key', (err, payload) => {
    if (err) {
      throw new AuthError('Authorization Error.');
    } else {
      req.user = payload;
    }
  });

  // try {
  //   payload = jwt.verify(token, 'some-secret-key');
  // } catch (err) {
  //   return res.status(401).send({ message: 'Authorization Required' });
  // }
  //
  // req.user = payload; // assigning the payload the the request object

  next(); // sending the request to the next middleware
};
