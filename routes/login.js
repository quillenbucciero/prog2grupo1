const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

/* GET home page. */
router.get('/', loginController);

module.exports = router;