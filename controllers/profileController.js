const db = require("../database/models"); //Requiero db 
const Usuarios = db.Usuarios; //Alias de la db
const bcrypt = require('bcryptjs');
const usuario = require('../database/models');



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
            
        });

    },
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
    profileEdit: (req,res) => {
        if (req.session.user != undefined){
            res.render('profile-edit')
        } else {
            res.redirect('/login')
        }
    },
    profileUpdate: (req,res) => {
        let info = req.body;
        let idEditar = req.session.Usuarios.id;

        let user = {
            nombre: info.name,
            apellido: info.apellido,
            email: info.email,
            usuario: info.usuario,
            fecha_de_nacimiento: info.fecha_de_nacimiento,
            dni: info.dni,
            foto: info.foto,
            updated_at: new Date(),
        }
        let filtro = {
            where: { id : idEditar}
        }
        Usuarios.update(usuario, filtro)
        .then(resultado => res.redirect('/'))
        .catch(error => console.log(error));

    },
    profile: (req,res) => {
        res.render('profile', {
            listaProductos: usuario.productos,
            img: usuario.user.foto})
    },
    logout: (req,res) => {

        req.session.destroy();
        res.clearCookie('userId');      
        return res.redirect("/")
        
    },
};
    

module.exports = profileController;
