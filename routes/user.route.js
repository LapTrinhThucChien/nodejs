const express = require('express');
const authorize = require('../middleware/authorize');
const { updateSchema } = require('./../controllers/user.controller');
const userController = require('./../controllers/user.controller');

const router = express.Router();
router.post('/authenticate', userController.authenticateSchema, userController.authenticate)
router.post('/register', userController.registerSchema, userController.register)
router.get('/current', authorize(), userController.getCurrent);
router.get('/:id', authorize(), userController.getById);
router.put('/:id', authorize(), updateSchema, userController.update);
router.delete('/:id', authorize(), userController.delete);
module.exports = router;