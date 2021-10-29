module.exports = (req, res, next) => {
  if (!Object.prototype.hasOwnProperty.call(res, 'result')) {
    next();
    return;
  }

  res.json({
    error: null,
    result: res.result,
  });
};
