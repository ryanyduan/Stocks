ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
};

handleError = (err, req, res, next) => {
  const output = {
    error: {
      name: err.name,
      message: err.message,
      text: err.toString()
    }
  };
  const statusCode = err.status || 401;
  res.status(statusCode).json(output);
};

module.exports = { ensureAuthenticated, handleError };
