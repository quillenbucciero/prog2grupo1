const express = require('express');
const router = express.Router();
const editController = require('../controllers/profile-editController')

/* GET home page. */
router.get('/', editController);

module.exports = router;