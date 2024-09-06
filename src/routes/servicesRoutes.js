const express = require('express');
const { addBookInUserProfile, getRecommendations } = require('../controllers/services');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/recomend', authMiddleware, getRecommendations);
router.post('/add/:bookId', authMiddleware, addBookInUserProfile);

module.exports = router;