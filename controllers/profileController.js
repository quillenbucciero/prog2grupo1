const db = require("../database/models"); //Requiero db 
const Usuarios = db.Usuarios; //Alias de la db
const bcrypt = require('bcryptjs');
const productos = db.Productos

const profileController = {
    login: function (req,res) {
        return res.render('login')
    },
    procesarLogin : (req, res) => {
        let info = req.body;
        let filtro = {where : [ { email : info.email}]};

        user.findOne(filtro)
        .then((result) => {
            
            if (result != null) {

                let passEncriptada = bcrypt.compareSync(info.password , result.password)
                if (passEncriptada) {

                    req.session.user = result.dataValues;

                    if (req.body.remember != undefined) {
                        res.cookie('id', result.dataValues.id, {maxAge : 1000 * 60 *10 } )
                    }

                    return res.redirect("/profile")

                } else {
                    return res.send("Existe el mail " +  result.email + " pero la clave es incorrecta");
                }
               
            } else {
                return res.send("No existe este mail " +  info.email);
            }

        }).catch((err) => {
            console.log(err);
        });
    },
    logout: (req,res) => {

        req.session.destroy();
        res.clearCookie('userId');      
        return res.redirect("/")
        
    },
    register:(req,res) => {
        return res.render('register')
    },
    procesarRegister : (req, res) => {
        let erroresRegister = {};
        if (req.body.nombre == "") {
            erroresRegister.message = "El nombre está vacío";
            res.locals.erroresRegister = erroresRegister;
            return res.render('register')
        } else if (req.body.email == "") {
            erroresRegister.message = "El email está vacío";
            res.locals.erroresRegister = erroresRegister;
            return res.render('register')
        }else if (req.body.contrasena == "") {
            erroresRegister.message = "La contraseña está vacía";
            res.locals.erroresRegister = erroresRegister;
            return res.render('register')
        }else if (req.body.contrasena.length < 3)  {
            erroresRegister.message = "La contraseña debe tener al menos tres carácteres";
            res.locals.erroresRegister = erroresRegister;
            return res.render('register')
        }else {

            let foto_de_perfil = req.file.filename;
            let usuarioNuevo = { 
                email : req.body.email,
                nombre : req.body.nombre,
                apellido: req.body.apellido,
                contrasena : bcrypt.hashSync(req.body.contrasena, 10),
                fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                documento: req.body.documento,
                created_at : new Date(),
                updated_at :  new Date(),
                foto_de_perfil: foto_de_perfil
            };

            let filtro = {where : [ { email : req.body.email}]};

            Usuarios.findOne(filtro)
            .then((result) => {
                
                if (!result) {
                    Usuarios.create(usuarioNuevo)
                    .then((result) => {
                        return res.redirect("/login")
                    }).catch((err) => {
                        console.log("Este es el error" +err);
                    });
                } else {
                    erroresRegister.message = "El email ya se encuentra registrado";
                    res.locals.erroresRegister = erroresRegister;
                    return res.render('register');
                }
            })
            .catch() 
        }       
    },
    index: (req, res) => {
        let id = req.params.id;

        Usuarios.findByPk(id, { 
          include: [
              {association: 'productoUsuario'},
              {association: 'comentario'}

          ]
        })
        .then(result =>{
          console.log(result.dataValues.productoUsuario);
          
          return res.render("profile", {
              usuario : result,

          })
        }).catch((err) => {
            console.log(err);
        });
    },
    edit: (req,res) => {
        let idEditar = req.params.id;



        Usuarios.findByPk(idEditar)
        .then((result) => { /*muestro sus datos xa poder editar*/
            let usuario = {
                id: result.dataValues.id,
                nombre: result.dataValues.nombre,
                apellido: result.dataValues.apellido,
                email: result.dataValues.email,
                usuario: result.dataValues.usuario,
                fecha_de_nacimiento: result.dataValues.fecha_de_nacimiento,
                documento: result.dataValues.documento,
                foto_de_perfil: result.dataValues.foto_de_perfil, 
                updated_at: new Date(),
            }

            

            return res.render('profile-edit', {
                usuario: usuario
            });    
        })
    },
    procesarEdit: (req,res) => {
        let idEditar = req.params.id;

        /*let foto_de_perfil = req.file.filename;*/

        Usuarios.update(
          {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            usuario: req.body.usuario,
            fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            documento: req.body.documento,
            /*foto_de_perfil: foto_de_perfil,*/
            updated_at: new Date()     
          }, 
          { where : 
            { id: idEditar}
          })
        .then ((result) => {
          return res.redirect("/profile")
        }).catch((err) => {
          return res.send(err)
        })   
    }
};

module.exports = profileController;
