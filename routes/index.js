const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);

router.get('/register', indexController.register);

router.get('/login', indexController.login)

module.exports = router;
