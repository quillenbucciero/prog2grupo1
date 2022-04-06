const data = require('../db/data');

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
