let db = require('../database/models');
let Productos = db.Productos;

const productController = {
    detalle : (req, res) => {
        let id = req.params.id;

        Productos.findByPk(id, {
            include: [
              {association : 'comentarios'},
              {association : 'usuarios', 
                include: [
                  {association: 'comentarios'}
              ]
            }]
      
            /* {
              all: true,        //Nos trae todas las associations
              nested: true      //Nos trae todas las associations anidadas
            } */            
          })
        .then(resultadoProductos =>{
          
          let productoSct = resultadoProductos.dataValues;

          let fecha = result.created_at;
          let fechaFormateada = new Date(fecha).toISOString().slice(0,10);

          let producto = {
            nombre: productoSct.nombre,
            imagen : productoSct.imagen,
            created_at : fechaFormateada,
            descripcion : productoSct.descripcion,
          }
          
          return res.render("product", {
              producto : producto,
          })
        }).catch((err) => {
          "Este es el error" +err;
        });
    },
    add: (req, res) => {
        return res.render('product-add')
    },
    procesarAgregar: (req, res) => {

      let imagenProducto = req.filename.imagen;

      let productoNuevo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        created_at: new Date(),
        imagen: imagenProducto,
        updated_at: new Date()
      }

      Productos.create(productoNuevo)
      .then((result) => {
        return res.redirect("/product/add")
    }).catch((err) => {
        "Este es el error" +err;
    });
    }
}

module.exports = productController;

