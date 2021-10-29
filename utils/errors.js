// Common types
class ExtendableError extends Error {
  /**
   * @param {String} message - Message
   * @param {Error} [cause] - Nested error
   * @param {String} [description] - Description
   * @param {Object} [meta] - Any metadata
   */
  constructor(message, cause = null, description = null, meta = null) {
    // noinspection JSCheckFunctionSignatures
    super(message);
    this.name = this.constructor.name;
    this.meta = meta;
    this.cause = cause;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 4xx
class ForbiddenError extends ExtendableError {}
class BadRequestError extends ExtendableError {}
class UnauthorizedError extends ExtendableError {}
class UnprocessableEntityError extends ExtendableError {}

class DangerQueryError extends ExtendableError {}

// 5xx
class BadGatewayError extends ExtendableError {}
class InternalServerError extends ExtendableError {}

module.exports = {
  ForbiddenError,
  BadRequestError,
  UnauthorizedError,
  UnprocessableEntityError,
  BadGatewayError,
  InternalServerError,
  DangerQueryError,
};
