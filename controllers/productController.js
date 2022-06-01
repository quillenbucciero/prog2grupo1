let data = require('../db/data');
let db = require('../database/models');
let Productos = db.Productos;

const productController = {
    index: function (req, res) {
        return res.render('product', {
            comentarios : data.comentarios,
            productos: data.producto,
            idSelected: req.params.id
        })
    },
    add: function(req, res) {
        return res.render('product-add')
    }
}
module.exports = productController;