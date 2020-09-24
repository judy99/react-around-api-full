const HTTP_OK = 200;
const ERR_BAD_REQUEST = 400;
const ERR_NOT_FOUND = 404;
const ERR_SERVER_ERROR = 500;

const notFoundError = () => ({ name: 'NotFound', message: 'The requested resource is not found' });

const showError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(ERR_BAD_REQUEST).send({
      message: err.message,
    });
  } else if (err.name === 'NotFound') {
    res.status(ERR_NOT_FOUND).send({
      message: err.message
    });
  } else {
    return res.status(ERR_SERVER_ERROR).send({
      message: err.message,
    });
  }
};

module.exports = {
  showError,
  HTTP_OK,
  notFoundError,
};
