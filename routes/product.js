const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

/*Importaciones*/
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
	destination: (req, file, cb) => { //Ruta de destino
    		cb(null, path.join(__dirname, '../public/images/products'));
	},
	filename: (req, file, cb) => { //File me trae toda la info y con extname extraigo la extensión.
    		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});
let upload = multer({ storage: storage }); 


/* GET home page. */
router.get('/id/:id', productController.detalle);

router.get('/add',productController.add);

router.post('/add', upload.single('imagen'), productController.procesarAgregar); 

router.get('/edit/id/:id', productController.edit);

router.post('/edit/id/:id', productController.procesarEdit);

router.get('/id/:id/comentario', productController.comentario);

router.post('/id/:id/comentario', productController.procesarComentario);

router.get('/borrar', productController.borrarProducto);

module.exports = router;