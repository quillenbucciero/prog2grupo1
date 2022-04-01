const express = require('express');
const router = express.Router();
const addController = require('../controllers/profile-addController')

/* GET home page. */
router.get('/', addController);

module.exports = router;