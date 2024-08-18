const express = require('express');
const router = express.Router();
const { register } = require('../controllers/category');
const { categoryInfo, validate } = require('../middlewares/Category');

router.post('/register', categoryInfo(), validate, register);

module.exports = router;