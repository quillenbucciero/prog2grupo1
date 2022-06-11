let db = require('../database/models');
let Productos = db.Productos;

const productController = {
    detalle : (req, res) => {
        let id = req.params.id;

        Productos.findByPk(id, {
          include: [
            {association: "usuarios"}
          ]
        })
        .then(result =>{

          let fecha = result.created_at;
          let fechaFormateada = new Date(fecha).toISOString().slice(0,10);

          let producto = {
            nombre: result.dataValues.nombre,
            imagen : result.dataValues.imagen,
            created_at : fechaFormateada,
            descripcion : result.dataValues.descripcion,
            usuarios: result.dataValues.usuarios,
          }
          
          return res.render("product", {
              producto : producto,

          })
        }).catch((err) => {
            console.log(err);
        });
    },
    add: (req, res) => {
        return res.render('product-add')
    },
    procesarAgregar: (req, res) => {

      /*let imagen = req.file.filename;*/

      let productoNuevo = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        created_at: new Date(),
        /*imagen: imagen,*/
        updated_at: new Date()
      }

      Productos.create(productoNuevo)
      .then((result) => {
        return res.redirect("/product")
      }).catch((err) => {
        console.log(err);
    });
    },
    edit: function(req, res) {
      return res.render('product-edit');
   }
}

module.exports = productController;

