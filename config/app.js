const express = require('express');
const userRoutes = require('../src/routes/userRoutes');
const categoryRoutes = require('../src/routes/categoryRoutes');
const authorRoutes = require('../src/routes/authorRoutes');
const bookRoutes = require('../src/routes/bookRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/author', authorRoutes);
app.use('/book', bookRoutes);

module.exports = app;