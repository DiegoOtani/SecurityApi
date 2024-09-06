const express = require('express');
const router = express.Router();
const { installDatabase } = require('../controllers/install');

router.get('/', installDatabase);

module.exports = router;
