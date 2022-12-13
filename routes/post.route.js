const express = require('express');

const authorize = require('./../middleware/authorize');
const router = express.Router();

const postController = require('../controllers/post.controller');

router.get('/', authorize(), postController.getAll);
router.get('/:id', authorize(), postController.getById);
router.post('/', authorize(), postController.schemaCreatePost, postController.create);
router.put('/:id', authorize(), postController.schemaUpdatePost,postController.update);
router.delete('/:id', authorize(), postController.delete);

module.exports = router;