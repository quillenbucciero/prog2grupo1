let data = require('../db/data');
let db = require('../database/models');
let Productos = db.Productos;

const productController = {
    index: function (req, res) {
        return res.render('product', {
            data : data.comentarios
        })
    },
    add: function(req, res) {
        return res.render('product-add')
    }
}
module.exports = productController;