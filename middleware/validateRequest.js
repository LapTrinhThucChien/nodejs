function validateRequest(req, next, schema) {
  const options = {
    abortEarly: false,
    allowUnknow: true,
    stripUnknow: true,
  }
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    next(error);
  } else {
    req.body = value;
    next();
  }
}

module.exports = validateRequest;