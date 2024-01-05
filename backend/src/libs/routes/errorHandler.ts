const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { message, status, error } = err;

  const result = {
    error: error || "undefined",
    message: message || "error",
    status: status || 500,
    timestamp: new Date(),
  };
  res.status(result.status).json(result);
};
export default errorHandler;
