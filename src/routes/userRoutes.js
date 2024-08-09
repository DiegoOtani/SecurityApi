const express = require('express');
const { completeUser, loginUser, validate} = require('../middlewares/userMiddlewares');
const { register } = require('../controllers/userController');

const router = express.Router();

router.post('/', completeUser(), validate, register);

module.exports = router;