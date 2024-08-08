const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_URL;

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
  console.log('Conectado ao MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro de conexão com o MongoDB Atlas:', err);
});

module.exports = mongoose;