const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);

router.get('/register', indexController.register);

router.post('/register', indexController.procesarRegister);

router.get('/login', indexController.login);

router.post('/login', indexController.procesarLogin); 

module.exports = router;

