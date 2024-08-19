const express = require('express');
const router = express.Router();
const { register, edit, deleteCategory, getAll } = require('../controllers/category');
const { categoryInfo, categoryId, validate } = require('../middlewares/Category');

router.get('/', getAll);
router.post('/', categoryInfo(), validate, register);
router.put('/',categoryId(), categoryInfo(), validate, edit);
router.delete('/', categoryId(), validate, deleteCategory);

module.exports = router;