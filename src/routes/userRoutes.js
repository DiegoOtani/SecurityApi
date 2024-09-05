const express = require('express');
const { completeUser, loginUser, validate} = require('../middlewares/User');
const { register, login, createAdmin } = require('../controllers/user');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth')

const router = express.Router();

router.post('/register', completeUser(), validate, register);
router.post('/login', loginUser(), validate, login);

router.post('/admin', authMiddleware, adminMiddleware, createAdmin);

module.exports = router;