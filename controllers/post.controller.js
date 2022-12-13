const Joi = require('joi');
const validateRequest = require('../middleware/validateRequest');
const postService = require('./../services/post.service');
module.exports = {
  getAll,
  getById,
  create,
  schemaCreatePost,
  update,
  schemaUpdatePost,
  delete: _delete
}

function getAll(req, res, next) {
  postService.getAll()
    .then((post) => res.json(post))
    .catch(next)
}

function getById(req, res, next) {
  postService.getById(req.params.id)
    .then((post) => res.json(post))
    .catch(next)
}

function schemaCreatePost (req, res, next){
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    categoryId: Joi.number().required(),
    userId: Joi.number().required()
  })
  validateRequest(req, next, schema)
}

function create(req, res, next) {
  postService.create(req.body)
    .then(() => res.json({ message: 'Post created successfully' }))
    .catch(next)
}

function update(req, res, next) {
  postService.update(req.params.id, req.body)
    .then((post) => res.json(post))
    .catch(next)
}

function schemaUpdatePost(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().empty(''),
    description: Joi.string().empty(''),
    categoryId: Joi.number().empty(undefined),
    userId: Joi.number().empty(undefined)
  })
  validateRequest(req, next, schema)
}

function _delete(req, res, next) {
  postService.delete(req.params.id)
    .then(() => res.json({ message: 'Post deleted successfully' }))
    .catch(next)
}