const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

/* GET home page. */
router.get('/id/:id', productController.detalle);

router.get('/add', productController.add);

module.exports = router;