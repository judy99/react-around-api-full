const httpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const notFoundError = () => ({
  name: 'NotFound',
  message: 'The requested resource is not found',
});

const showError = (res, err) => {
  let error;
  switch (err.name) {
    case 'ValidationError':
    case 'CastError':
      error = res.status(httpStatusCode.BAD_REQUEST).send({
        message: err.message,
      });
      break;
    case 'NotFound':
      error = res.status(httpStatusCode.NOT_FOUND).send({
        message: err.message,
      });
      break;
    default:
      error = res.status(httpStatusCode.SERVER_ERROR).send({
        message: err.message,
      });
  }
  return error;
};

module.exports = {
  showError,
  httpStatusCode,
  notFoundError,
};
