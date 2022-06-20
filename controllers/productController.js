let db = require('../database/models');
const usuarios = require('../database/models/usuarios');
let Productos = db.Productos;
let Comentarios = db.Comentarios;
const bcrypt = require('bcryptjs');

const productController = {
    detalle : (req, res) => {
        let id = req.params.id;

        let comentarios = {
          include : {
              all: true,
              nested: true
          },
          order : [
            ["comentarioProducto", "createdAt" , "DESC"]
          ]
      }
        Productos.findByPk(id, comentarios)
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
          return res.redirect("/product/id/" + idEditar)
        }).catch((err) => {
          return res.send(err)
        })
      },
    comentarioNuevo: function (req,res) {        
          return res.render('product')
        },
    procesarComentarioNuevo: (req, res) => {
          let idProducto = req.params.id;
          let usuarioId = req.session.usuario.id;
          let ComentarioNuevo = {
            texto: req.body.texto,
            created_at: new Date(),
            producto_id: idProducto,
            usuario_id: usuarioId            
          }
          Comentarios.create(ComentarioNuevo)
          .then((result) => {
            return res.redirect("/product/id/" + idProducto)
          }).catch((err) => {
            console.log("Este es el error " + err);
        });
        },
    borrarProducto: (req,res) => {
          let idProducto = req.params.id;
          Productos.findByPk(idProducto)
          .then ((result) => {
              let idUsuario =  req.session.usuario.id;
                if (result.usuario_id == idUsuario) {
                    Productos.destroy({ where: { id : idProducto } })
                    .then ((result) => {
                      return res.redirect("/")
                    }).catch ((err) => {
                      console.log("Este es el error " + err);
                    });                  
                } else {
                  return res.redirect("/product/id/" + idProducto)
                }
          }).catch ((err) => {
            console.log("Este es el error " + err);
          })
        }  
}

module.exports = productController;

