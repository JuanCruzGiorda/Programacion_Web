const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Archivo de configuración de Sequelize

const Producto = sequelize.define('Producto', {
  codigo_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'productos',  // Nombre de la tabla en la base de datos SQLite
  timestamps: true,       // Para que Sequelize maneje createdAt y updatedAt
});

module.exports = Producto;