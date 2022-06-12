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



   
      }

}

module.exports = productController;

