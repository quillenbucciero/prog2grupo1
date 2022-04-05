const data = require("../db/data");

const profileController = {
    edit: function(req,res) {
        res.render('profile-edit',{
            usuarioData: data.usuario
        });
    }
};

module.exports = profileController;