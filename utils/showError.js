const httpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const showError = (res, err, customMessage) => {
  let error;
  switch (err.name) {
    case 'ValidationError':
      error = res.status(httpStatusCode.BAD_REQUEST).send({
        message: customMessage,
      });
      break;
    case 'NotFound':
    case 'CastError':
      error = res.status(httpStatusCode.NOT_FOUND).send({
        message: customMessage,
      });
      break;
    default:
      error = res.status(httpStatusCode.SERVER_ERROR).send(
        {
          // type: 'ServerError',
          message: 'Internal Server Error',
        },
      );
  }
  return error;
};

module.exports = {
  showError,
  httpStatusCode,
};
