const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.index);
router.post('/users/create', userController.create);
router.post('/users/delete/:id', userController.delete);

module.exports = router;