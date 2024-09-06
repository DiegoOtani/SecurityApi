const express = require('express');
const router = express.Router();
const { authorInfo, validate } = require('../middlewares/Author');
const { getAll, create, edit, deleteAuthor, getAuthorById } = require('../controllers/author');

router.get('/', getAll);
router.get('/:id', getAuthorById);
router.post('/', authorInfo(), validate, create);
router.put('/:id', edit);
router.delete('/:id', deleteAuthor);

module.exports = router;
