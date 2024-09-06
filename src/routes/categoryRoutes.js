const express = require('express');
const router = express.Router();
const { register, edit, deleteCategory, getAll, getCategoryById } = require('../controllers/category');
const { categoryInfo, validate } = require('../middlewares/Category');

router.get('/', getAll);
router.get('/:id', getCategoryById);
router.post('/', categoryInfo(), validate, register);
router.put('/:id', categoryInfo(), validate, edit);
router.delete('/:id', deleteCategory);

module.exports = router;