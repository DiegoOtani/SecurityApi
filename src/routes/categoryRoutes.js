const express = require('express');
const router = express.Router();
const { register, edit, deleteCategory, getAll } = require('../controllers/category');
const { categoryInfo, validate } = require('../middlewares/Category');

router.get('/', getAll);
router.post('/', categoryInfo(), validate, register);
router.put('/:id', categoryInfo(), validate, edit);
router.delete('/:id', deleteCategory);

module.exports = router;