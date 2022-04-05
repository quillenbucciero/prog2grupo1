let data = require('../db/data');

const profileController = {
    edit: function(req, res) {
       return res.render('profile-edit');

    }
};

module.exports = profileController;