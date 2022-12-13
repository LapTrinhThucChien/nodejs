const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');
const categoryService = require('./../services/category.service');

module.exports = {
  getAll,
  getById,
  create,
  schemaCreateCategory,
  update,
  schemaUpdateCategory,
  delete: _delete
}

function getAll(req, res, next) {
  categoryService.getAll()
    .then((category) => res.json(category))
    .catch(next)
}

function getById(req, res, next) {
  const id = req.params.id;
  categoryService.getById(id)
    .then((category) => res.json(category))
    .catch(next)
}

function create(req, res, next) {
  categoryService.create(req.body)
    .then(() => res.json({ message: 'Category created successfully' }))
    .catch(next)
}

function schemaCreateCategory(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  })
  validateRequest(req, next, schema)
}

function update(req, res, next) {
  categoryService.update(req.params.id, req.body)
    .then((category) => res.json(category))
    .catch(next)
}

function schemaUpdateCategory(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(''),
    description: Joi.string().empty('')
  })
  validateRequest(req, next, schema)
}

function _delete(req, res, next) {
  categoryService.delete(req.params.id)
    .then(() => res.json({ message: 'Category deleted successfully' }))
    .catch(next)
}