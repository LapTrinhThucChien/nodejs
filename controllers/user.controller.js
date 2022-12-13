const Joi = require('joi');
const validateRequest = require('./../middleware/validateRequest');
const userService = require('./../services/user.service');

module.exports = {
  authenticate,
  authenticateSchema,
  register,
  registerSchema,
  getAll,
  update,
  updateSchema,
  getById,
  getCurrent,
  delete: _delete
}

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => res.json(user))
    .catch(next)
}

function registerSchema(req, rex, next) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required()
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({ message: 'Registation successfully' }))
    .catch(next);
}

function getAll(req, res, next) {
  userService.getAll()
    .then((user) => res.json(user))
    .catch(next);
}

function getCurrent(req, res, next) {
  res.json(req.user);
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => res.json(user))
    .catch(next)
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    firstName: Joi.string().empty(''),
    lastName: Joi.string().empty(''),
    username: Joi.string().empty(''),
    password: Joi.string().min(6).empty('')
  })
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(user => res.json(user))
    .catch(next)
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(next);
}