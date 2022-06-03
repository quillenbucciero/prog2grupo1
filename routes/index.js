const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/*Importaciones*/
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
	destination: (req, file, cb) => { //Ruta de destino
    		cb(null, path.join(__dirname, '../public/images/users'));
	},
	filename: (req, file, cb) => { //File me trae toda la info y con extname extraigo la extensión.
    		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});
let upload = multer({ storage: storage });

/* GET home page. */
router.get('/', indexController.index);

router.get('/register', indexController.register);

router.post('/register', upload.single('profilePhoto'), indexController.procesarRegister);

router.get('/login', indexController.login);

router.post('/login', indexController.procesarLogin); 

router.post('/', indexController.logout);

module.exports = router;

