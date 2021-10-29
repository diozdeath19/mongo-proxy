const errors = require('../utils/errors');
const errorCodes = require('../utils/error_codes');
// const {log} = require('../../logger');

// noinspection JSUnusedLocalSymbols
module.exports = (err, req, res, _next) => {
  let method = 'warn';
  const response = {
    error: err.message || errorCodes.INTERNAL_ERROR,
    result: err.meta || null,
  };

  switch (err.constructor && err.constructor.name) {
    case errors.BadRequestError.name:
      res.status(400).json(response);
      break;
    case errors.UnauthorizedError.name:
      res.status(401).json(response);
      break;
    case errors.ForbiddenError.name:
      res.status(403).json(response);
      break;
    case errors.UnprocessableEntityError.name:
      res.status(422).json(response);
      break;
    default:
      method = 'error';
      response.error = errorCodes.INTERNAL_ERROR;
      res.status(500).json(response);
      break;
  }

  console.log(err, 'ERROR');
};
