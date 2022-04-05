let data = require('../db/data');

const profileController = {

    index: function(req, res) {


        return res.render('profile',{
            data: data.usuario
        })

    },

    edit: function(req, res) {
       return res.render('profile-edit');

    }
};

module.exports = profileController;
