const express = require('express');
const authorize = require('../middleware/authorize');

const router = express.Router();

const categoryController = require('./../controllers/category.controller');

router.get('/', authorize(), categoryController.getAll);
router.get('/:id', authorize(), categoryController.getById);
router.post('/', authorize(), categoryController.schemaCreateCategory, categoryController.create);
router.put('/:id', categoryController.schemaUpdateCategory, categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router;