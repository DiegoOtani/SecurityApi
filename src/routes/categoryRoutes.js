const express = require('express');
const router = express.Router();
const { register, edit, deleteCategory, getAll, getCategoryById } = require('../controllers/category');
const { categoryInfo, validate } = require('../middlewares/Category');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', getAll);
router.get('/:id', getCategoryById);
router.post('/', authMiddleware, categoryInfo(), validate, register);
router.put('/:id', authMiddleware, categoryInfo(), validate, edit);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;