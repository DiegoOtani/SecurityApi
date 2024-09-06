const express = require('express');
const router = express.Router();
const { authorInfo, validate } = require('../middlewares/Author');
const { getAll, create, edit, deleteAuthor, getAuthorById } = require('../controllers/author');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', getAll);
router.get('/:id', getAuthorById);
router.post('/', authMiddleware, authorInfo(), validate, create);
router.put('/:id', authMiddleware, edit);
router.delete('/:id', authMiddleware, deleteAuthor);

module.exports = router;
