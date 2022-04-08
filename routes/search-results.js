const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search-resultsController')

/* GET home page. */
router.get('/id/:id?', searchController.index);

module.exports = router;