const express = require('express');
const sequelize = require('./database'); // Archivo de configuración de Sequelize
const Usuario = require('./models/usuario'); // Modelo de Usuario}
const Producto = require('./models/producto'); // Modelo de Producto
const Proveedor = require('./models/proveedor'); // Modelo de Proveedor

const app = express();
const port = 3000;

app.use(express.json()); // Para que Express pueda manejar JSON

// Sincronizar Sequelize con la base de datos
sequelize.sync({ force: false }) // 'force: true' recreará las tablas cada vez que corra la app
  .then(() => {
    console.log('Base de datos SQLite y tablas sincronizadas.');
  });

// Ruta para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario.' });
  }
});
app.post('/productos', async (req, res) => {
    try {
      const nuevoProducto = await Producto.create(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el producto.' });
    }
  });

app.post('/proveedores', async (req, res) => {
    try {
      const nuevoProveedor = await Proveedor.create(req.body);
      res.status(201).json(nuevoProveedor);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el proveedor.' });
    }
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}); 