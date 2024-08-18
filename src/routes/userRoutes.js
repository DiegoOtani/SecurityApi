const express = require('express');
const { completeUser, loginUser, validate} = require('../middlewares/User');
const { register, login } = require('../controllers/user');

const router = express.Router();

router.post('/register', completeUser(), validate, register);
router.post('/login', loginUser(), validate, login);

module.exports = router;