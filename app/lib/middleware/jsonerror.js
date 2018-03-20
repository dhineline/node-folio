module.exports.errorResponse = (err, req, res, next) => {
  res.status(500).json(err);
  next();
}
