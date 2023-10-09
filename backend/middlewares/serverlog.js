const { SERVER_ERROR } = require('../errors/statusCode');

const serverLog = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR
      ? 'Произошла ошибка на сервере'
      : message,
  });

  next();
};

module.exports = {
  serverLog,
};
