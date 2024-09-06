const express = require('express');
const { addBookInUserProfile } = require('../controllers/services');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/add/:bookId', authMiddleware, addBookInUserProfile);

module.exports = router;