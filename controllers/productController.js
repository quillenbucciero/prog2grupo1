let db = require('../database/models');
const usuarios = require('../database/models/usuarios');
let Productos = db.Productos;

const productController = {
    detalle : (req, res) => {
        let id = req.params.id;

        Productos.findByPk(id, {
          include: [
            {association: "usuarios"}
          ]
        })
        .then((result) =>{
          
          return res.render("product", {
              producto : result,

          })
        }).catch((err) => {
            console.log(err);
        });
    },
    add: (req, res) => {
        return res.render('product-add')
    },
    procesarAgregar: (req, res) => {

      let imagen = req.file.filename;
      let productoNuevo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        created_at: new Date(),
        imagen: imagen,
        updated_at: new Date()
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
          imagen: result.dataValues.imagen,      
          updated_at: new Date()

        }

        return res.render('product-edit', {
          producto : product
        });
     
      })
      },
      procesarEdit: (req,res)=> {
        let idEditar = req.params.id;

        Productos.update(
          {
              nombre: req.body.nombre,
              descripcion: req.body.descripcion,
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
      comentario: function (req,res) {
        return res.render('register')
      },
      procesarComentario: (req, res) => {

        let ComentarioNuevo = {
          texto: req.body.comentario,
          imagen: req.body.descripcion,
         // producto: req.body.id
         // usuarios: 
        }

        Comentarios.create(ComentarioNuevo)
        .then((result) => {
          return res.redirect("/product/id")
        }).catch((err) => {
          console.log("Este es el error" +err);
      });
      }
    /*  borrarProducto: (req.res) => {

      let filtro = {where : [ {user_id : req.sesion.id}]} // CAMBIAR ESTO
      if (condition) {
        Productos.destroy({
          where: {
            id : producto.id
          }
        })
        
      } else {
        return res.redirect("/id/:id")
      }
      Al clickear dicho botón debe borrarse el producto pero previamente se tiene que verificar que el posteo que está siendo borrado pertenece al usuario logueado. En caso de error debe redirigir al usuario a la página de detalle de ese producto
      } */
      


}

module.exports = productController;

