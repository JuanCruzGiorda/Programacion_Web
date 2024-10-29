const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas
router.get('/', userController.getUsers);
router.post('/add', userController.createUser);
//Ruta eliminar Usuario por ID
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;