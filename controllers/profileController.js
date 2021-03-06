const db = require("../database/models"); //Requiero db 
const Usuarios = db.Usuarios; //Alias de la db
const bcrypt = require('bcryptjs');
const productos = db.Productos
const Seguidores = db.Seguidores;

const profileController = {
    register: function (req,res) {
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
                        return res.redirect("/profile/login")
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    erroresRegister.message = "El email ya se encuentra registrado";
                    res.locals.erroresRegister = erroresRegister;
                    return res.render('register');
                }
            }).catch((err) => {
                console.log(err);
            });
            
        }       
    },
    login: function (req,res) {
        return res.render("login")
    },
    procesarLogin : (req, res) => {
        let info = req.body;
        let filtro = {where : [ { email : info.email}]};
        let erroresLogin = {};

        if (info.mail == "") {
            erroresLogin.message = "El mail está vacío";
            res.locals.erroresLogin = erroresLogin;
            return res.render('login');
            
        } else if (info.password == "") {
            erroresLogin.message = "La contraseña está vacía";
            res.locals.erroresLogin = erroresLogin;
            return res.render('login');            
        }else {
            Usuarios.findOne(filtro)
        .then((result) => {
            
            if (result != null) {

                let passEncriptada = bcrypt.compareSync(info.password , result.contrasena)
                if (passEncriptada) {

                    req.session.usuario = result.dataValues; // creo la propiedad usuarios

                    if (req.body.remember != undefined) {
                        res.cookie('id', result.dataValues.id, {maxAge : 1000 * 60 *10 } )
                    }
                    return res.redirect("/")

                } else {
                    erroresLogin.message = "Existe el mail " +  result.email + " pero la clave es incorrecta";
                    res.locals.erroresLogin = erroresLogin;
                    return res.render('login');                   
                }
               
            } else {
                erroresLogin.message = "No existe este mail " +  info.email ;
                res.locals.erroresLogin = erroresLogin;
                return res.render('login');
            }

        }).catch((err) => {
            console.log(err);
        });
        }
    },      
    logout: (req,res) => {

        req.session.destroy();
        res.clearCookie('id');      
        return res.redirect("/")
        
    },
    index: (req, res) => {
        let id = req.params.id;

        Usuarios.findByPk(id, { 
          include: {
              all: true,
              nested: true
          }
        })
        .then(result =>{
          console.log(result.dataValues.productoUsuario);
          
          return res.render("profile", {
              user : result,

          })
        }).catch((err) => {
            console.log(err);
        });
    },
    edit: (req,res) => {
        let idEditar = req.params.id;

        Usuarios.findByPk(idEditar)
        .then((result) => { /*muestro sus datos xa poder editar*/
        
        let idUsuario = req.session.usuario.id;    

        if (result.id == idUsuario){
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
            } else{
                return res.redirect(`/profile/id/${idEditar}`)
            }
        })

    },
    procesarEdit: (req,res) => {
    let idEditar = req.params.id;
     let foto_de_perfil = req.file.filename;
     Usuarios.update(
            {
             nombre: req.body.nombre,
             apellido: req.body.apellido,
             email: req.body.email,
             usuario: req.body.usuario,
             fecha_de_nacimiento: req.body.fecha_de_nacimiento,
             documento: req.body.documento,
             foto_de_perfil: foto_de_perfil, 
            }, 
            {where :{ id: idEditar}})
                .then ((result) => {
                    console.log(result);
                return res.redirect(`/profile/id/${idEditar}`)
                }).catch((err) => {
                return res.send(err)
                })   
    }, 
    seguir : (req,res) => {

        let errores = {}       
        let info = req.body
        let seguimiento = {
        seguidor_id: req.session.usuario.id,
        seguido_id: info.seguidoId
         }

         let filtro = { where:[{seguidor_id: req.params.id, seguido_id: info.seguidoId }] }

         Seguidores.findOne(filtro, {
                    include: {
                        all: true,
                        nested: true
                    }
        })
        .then((result) => {
            if (result === null) {

                Seguidores.create(seguimiento)
                .then((result) => {
                    res.redirect('/profile/id/' + req.params.id)
                }).catch((err) => {
                    console.log(err)
                });
            } else {
                errores.message = "Ya sigue a este usuario"
                res.locals.errors = errores
            }
        }).catch((err) => {
            console.log(err)
        });    
       
    },
    unfollow: (req, res) => {
        let info = req.body
        let seguidor = req.session.usuario.id 
        let seguido = info.seguidoId
        filtro = {
            where:[{seguidor_id: seguidor, seguido_id: seguido}]
        }
        Seguidores.destroy(filtro)
        .then(resultado => res.redirect('/profile/id/'+ req.params.id))
        .catch(err => console.log(err))
    },
}
    

module.exports = profileController;
