let data = require('../db/data');

const searchController = {
    index: function(req,res){  
        
        let palabraBuscada = req.query.search;  
        let productosEncontrados = []; 
        
        for (let i = 0; i < data.producto.length; i++) {
            if (data.producto[i].nombreProducto.toLowerCase().includes(palabraBuscada)) {
                productosEncontrados.push(data.producto[i])
            }
            
        }

        return res.render('search-results',{
            productos: productosEncontrados,
            buscado : palabraBuscada
        });


       
    }
};

module.exports = searchController;
