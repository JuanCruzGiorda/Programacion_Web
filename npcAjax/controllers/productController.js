const Product = require('../models/productModel');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el producto');
    }
};

// Crear nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const { name, code, quantity, price } = req.body;
        const newProduct = await Product.create({ name, code, quantity, price });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send('Error al crear el producto');
    }
};

// Eliminar producto por ID
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el producto');
    }
};

// Actualizar producto por ID
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, quantity, price } = req.body;
        const [updated] = await Product.update({ name, code, quantity, price }, { where: { id } });
        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al actualizar el producto');
    }
};