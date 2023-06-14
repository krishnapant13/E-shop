const ErrorHandler = require("../utills/ErrorHandler");
module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // wrong mongo id error
  if (error.name === "CastError") {
    const message = `Resources not found with this id .. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again later`;
    err = new ErrorHandler(message, 400);
  }

  //jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your url is expired please try to re-create the link`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
