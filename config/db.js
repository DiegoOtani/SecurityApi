const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_URL;

const UserController = require('../src/controllers/user');

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
  UserController.initializeDefaultAdmin();
  console.log('Conectado ao MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro de conexão com o MongoDB Atlas:', err);
});

module.exports = mongoose;