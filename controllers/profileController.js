const db = require("../database/models"); //Requiero db 
const Usuarios = db.Usuarios; //Alias de la db

const profileController = {
    index: function(req, res) {
        return res.render('profile',{
            data: Usuarios,
        })
    },
    edit: function(req, res) {
       return res.render('profile-edit');
    },
};

module.exports = profileController;
