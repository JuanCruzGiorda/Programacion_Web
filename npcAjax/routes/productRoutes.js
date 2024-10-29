const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById); // Asegúrate de tener esta ruta configurada
router.post('/add', productController.createProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.put('/update/:id', productController.updateProduct);

module.exports = router;