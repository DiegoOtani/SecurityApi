const express = require('express');
const router = express.Router();
const { bookInfo, validate } = require('../middlewares/Book');
const { getAll, create, update, deleteBook, getBookByid } = require('../controllers/book');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', getAll);
router.get('/:id', getBookByid);
router.post('/', authMiddleware, bookInfo(), validate, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;