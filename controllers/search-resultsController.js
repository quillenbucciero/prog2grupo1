const data = require('../db/data');

const searchController = {
    index: function(req,res){        
        return res.render('search-results');
    }
};

module.exports = searchController;
