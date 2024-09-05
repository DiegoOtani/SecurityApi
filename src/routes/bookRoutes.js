const express = require('express');
const router = express.Router();
const { bookInfo, validate } = require('../middlewares/Book');
const { getAll, create } = require('../controllers/book');

router.get('/', getAll);
router.post('/', bookInfo(), validate, create);

module.exports = router;