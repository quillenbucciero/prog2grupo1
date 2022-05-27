const data = require('../db/data'); //BASE DE DATOS ANTERIOR, BORRAR
const db = require('../database/models');
const nombreDB = db.nombreDB //USAR ALIAS DEL MODELO

const indexController = {
    index: function (req,res) {
        return res.render('index', {
            data: data.producto,
        })
    },
    register: function (req,res) {
        return res.render('register')
    },
    login: function (req,res) {
        return res.render('login')
    }
};

module.exports = indexController;
