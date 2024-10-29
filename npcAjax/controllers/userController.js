const User = require('../models/userModel');

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// Crear nuevo usuario
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        await User.create({ name, email });
        res.status(201).json({ message: 'Usuario creado' });
    } catch (error) {
        res.status(500).send('Error al crear el usuario');
    }
};

//Eliminar usuario po Id
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
};