const db = require("../database/models"); //Requiero db 
const Productos = db.Productos; //Alias de la db
const Comentarios = db.Comentarios;
const Usuarios = db.Usuarios;
const op = db.Sequelize.Op;

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');

const indexController = {
    index: function (req,res) {
        
        db.Productos.findAll( {
            limit: 8,
            order: [
                ['created_at', 'DESC'] 
            ],
            include: {
                all : true,
                nested : true
            }
        })
        .then(function (result) {

            console.log(result);

            return res.render('index', {
                data: result,
            })
        }).catch((err) => {
            console.log(err);
        });
    },
    search: function(req,res){  
        let palabraBuscada = req.query.search; /* search es el input name del formulario de los headers*/ 
        let promesaNombre = Productos.findAll({
                                include: [{association: 'usuarioProducto'}],
                                where:[
                                    { nombre:{ [op.like]: `%${palabraBuscada}%`}}
                                 ] 
                             });
        let promesaDescripcion = Productos.findAll({
                        include: [{association: 'usuarioProducto'}],
                                     where:[
                                         { descripcion:{ [op.like]: `%${palabraBuscada}%`}}
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

}
    module.exports = indexController;

