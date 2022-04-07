let data = require('../db/data');

const searchController = {
    index: function(req,res){        
        return res.render('search-results',{
            productos: data.producto
        });
    }
};

module.exports = searchController;
