const db = require("../database/models"); //Requiero db 
const Productos = db.Productos; //Alias de la db
const op = db.Sequelize.Op;

const searchController = {
    index: function(req,res){  
        let palabraBuscada = req.query.search; /* search es el input name del formulario de los headers*/ 
        let promesaNombre = Productos.findAll({
                                where:[
                                    {nombre:{ [op.like]: `%${palabraBuscada}%`}}
                                ] 
                            });
        let promesaDescripcion = Productos.findAll({
                                    where:[
                                        {descripcion:{ [op.like]: `%${palabraBuscada}%`}}
                                    ] 
                                });
        Promise.all([promesaNombre, promesaDescripcion])
        .then(function([resNombre, resDescripcion]){
            let arrDeResultados = [];
            for (let i = 0; i < resNombre.length; i++) {
                arrDeResultados.push(resNombre[i])
            } 
            for (let i = 0; i < resDescripcion.length; i++) {
                arrDeResultados.push(resDescripcion[i])
            } 
            res.render('search-results', {
                resultados: arrDeResultados
            })
        })
        .catch(err => console.log(err));
    }

  /*EN CASO DE NO ENCONTRAR RTDOS MOSTRAR MENSAJE*/


};

module.exports = searchController;
