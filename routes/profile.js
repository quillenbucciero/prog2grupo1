const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

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
router.get('/id/:id', profileController.index);

router.get('/edit/id/:id', profileController.edit);

router.post('/edit/id/:id', upload.single('foto_de_perfil'), profileController.procesarEdit); /* uso multer */

router.get('/register', profileController.register);

router.post('/register', upload.single('foto_de_perfil'), indexController.procesarRegister);

router.get('/login', indexController.login);

router.post('/login', indexController.procesarLogin); 

router.post('/logout', indexController.logout);





module.exports = router;