const express = require('express');
const router = express.Router();
const { bookInfo, validate } = require('../middlewares/Book');
const { getAll, create, update, deleteBook } = require('../controllers/book');

router.get('/', getAll);
router.post('/', bookInfo(), validate, create);
router.put('/:id', update);
router.delete('/:id', deleteBook);

module.exports = router;