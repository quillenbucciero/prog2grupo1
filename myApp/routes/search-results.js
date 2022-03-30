const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search-resultsController')

/* GET home page. */
router.get('/', searchController);

module.exports = router;