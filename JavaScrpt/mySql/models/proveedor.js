const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Archivo de configuración de Sequelize

const Proveedor = sequelize.define('Proveedor', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  domicilio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  condicionIva: {
    type: DataTypes.ENUM('Responsable Inscripto', 'Monotributista', 'Exento', 'No Responsable'),
    allowNull: false,
  },
}, {
  tableName: 'proveedores',  // Nombre de la tabla en la base de datos SQLite
  timestamps: true,       // Para que Sequelize maneje createdAt y updatedAt
});

module.exports = Proveedor;