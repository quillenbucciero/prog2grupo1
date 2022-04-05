<<<<<<< HEAD
const data = require("../db/data");

const profileController = {
    edit: function(req,res) {
        res.render('profile-edit',{
            usuarioData: data.usuario
        });
=======
let data = require('../db/data');

const profileController = {
    edit: function(req, res) {
       return res.render('profile-edit');

>>>>>>> 88a34ab13161e18ee45be9db29f35731746eb664
    }
};

module.exports = profileController;