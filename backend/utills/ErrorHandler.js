class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCosde;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;
