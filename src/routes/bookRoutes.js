const express = require('express');
const router = express.Router();
const { bookInfo, validate } = require('../middlewares/Book');
const { getAll, create, update, deleteBook, getBookByid } = require('../controllers/book');

router.get('/', getAll);
router.get('/:id', getBookByid);
router.post('/', bookInfo(), validate, create);
router.put('/:id', update);
router.delete('/:id', deleteBook);

module.exports = router;