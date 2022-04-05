const data = require('../db/data');

const indexController = {
    index: function (req,res) {
        res.render('index', {
            data: data.producto,
        })
    },
    register: function (req,res) {
        res.render('register')
    },
    login: function (req,res) {
        res.render('login')
    }
};

module.exports = indexController;