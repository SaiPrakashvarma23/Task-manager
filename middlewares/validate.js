const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const err = new Error('Validation Error');
    err.statusCode = 400;
    err.details = error.details.map((detail) => detail.message);
    return next(err);
  }
  next();
};

module.exports = validate;
