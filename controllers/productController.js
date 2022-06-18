let db = require('../database/models');
const usuarios = require('../database/models/usuarios');
let Productos = db.Productos;
let Comentarios = db.Comentarios;
const bcrypt = require('bcryptjs');

const productController = {
    detalle : (req, res) => {
        let id = req.params.id;

        Productos.findByPk(id, {
          include: {
            all : true,
            nested : true
        }
        })
        .then((result) =>{
          
          return res.render("product", {
              producto : result.dataValues,

          })
        }).catch((err) => {
            console.log(err);
        });
    },
    add: (req, res) => {
        return res.render('product-add')
    },
    procesarAgregar: (req, res) => {
      let usuarioId = req.session.usuario.id;
      let imagen = req.file.filename;
      let productoNuevo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        created_at: new Date(),
        imagen: imagen,
        updated_at: new Date(),
        usuario_id: usuarioId
      }

      Productos.create(productoNuevo)
      .then((result) => {
        return res.redirect("/")
      }).catch((err) => {
        console.log("Este es el error" +err);
    });
    },
    edit: function(req, res) {

      let id = req.params.id 

      Productos.findByPk(id)
      .then((result) => {

        let product = {
          id: result.dataValues.id,
          nombre: result.dataValues.nombre,
          descripcion: result.dataValues.descripcion, 
          updated_at: new Date()

        }
        return res.render('product-edit', {
          producto : product
        });
     
      }).catch((err) => {
        console.log("Este es el error" +err);
      });
      },
    procesarEdit: (req,res)=> {
        let idEditar = req.params.id;
        let imagen = req.file.filename;
        Productos.update({
          
              nombre: req.body.nombre,
              descripcion: req.body.descripcion,
              imagen: imagen,
              updated_at: new Date()         
          }, 
          { where : 
            { id: idEditar}
          })
        .then ((result) => {
          return res.redirect("/")
        }).catch((err) => {
          return res.send(err)
        })
      },
      comentarios: (req,res) => {
        
        let idProducto = req.params.id;

          Comentarios.findAll( {
            where: [
              {producto_id: idProducto}
            ],
            limit: 3,
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

            return res.render('product', {
                data: result.dataValues,
            })
        }).catch((err) => {
            console.log(err);
        });


      },
      comentarioNuevo: function (req,res) {
        return res.render('register')
      },
      procesarComentarioNuevo: (req, res) => {

        let idProducto = req.params.id;

        let ComentarioNuevo = {
          texto: req.body.texto,
          producto_id: idProducto,
          usuario_id: req.session.usuario.id

        }

        Comentarios.create(ComentarioNuevo)
        .then((result) => {
          return res.redirect("/product/id/:id")
        }).catch((err) => {
          console.log("Este es el error" + err);
      });
      },
      borrarProducto: (req,res) => {
        let idProducto = req.params.id;
        Productos.findByPk(idProducto)
        .then ((result) => {
             let idUsuario =  req.session.usuario.id;
              if (result.dataValues.usuario_id == idUsuario) {
                Productos.destroy({
                  where: {
                    id : idProducto
                  }
                })
                
              } else {
                return res.redirect("/")
              }
        }).catch ((err) => {
          console.log("Este es el error" + err);
        })
      }
      
}

module.exports = productController;

