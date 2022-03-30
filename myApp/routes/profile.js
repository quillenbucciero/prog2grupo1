const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')

/* GET home page. */
router.get('/', profileController);

module.exports = router;