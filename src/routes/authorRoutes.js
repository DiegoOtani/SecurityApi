const express = require('express');
const router = express.Router();
const { authorInfo, validate } = require('../middlewares/Author');
const { getAll, create } = require('../controllers/author');

router.get('/', getAll);
router.post('/', authorInfo(), validate, create);

module.exports = router;
