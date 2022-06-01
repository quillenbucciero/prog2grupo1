const express = require('express');
const { EmptyResultError } = require('sequelize/types');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);

router.get('/register', indexController.register);

router.post('/register', indexController.procesarRegister);

router.get('/login', indexController.login);

router.post('/login', indexController.procesarLogin); 

router.post('/', indexController.logout);

module.exports = router;

