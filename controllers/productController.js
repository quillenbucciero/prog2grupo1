let db = require('../database/models');
let Productos = db.Productos;

const productController = {
    detalle : (req, res) => {
        let id = req.params.id;

        Productos.findByPk(id)
        .then((result) =>{    
          /*let fecha = result.created_at;*/
          /*let fechaFormateada = new Date(fecha).toISOString().slice(0,10);*/
    
          let producto = {
            nombre: result.nombre,
            imagen : req.file.filename,
            /*created_at : fechaFormateada,*/
            descripcion : result.descripcion,
          }
          
          return res.render("product", {
              producto : producto
          })
        }).catch((err) => {
          "Este es el error" +err;
      });
    },
    add: (req, res) => {
        return res.render('product-add')
    },
    procesarAgregar: (req, res) => {

      /*let imagenProducto = req.filename.imagen;*/

      let productoNuevo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        created_at: new Date(),
        /*imagen: imagenProducto*/
        updated_at: new Date()
      }

      Productos.create(productoNuevo)
      .then((result) => {
        return res.redirect("/product")
    }).catch((err) => {
        "Este es el error" +err;
    });
    }
}

module.exports = productController;

