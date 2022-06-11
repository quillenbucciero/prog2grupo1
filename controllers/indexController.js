const db = require("../database/models"); //Requiero db 
const Usuarios = db.Usuarios; //Alias de la db

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');

const indexController = {
    index: function (req,res) {
        
        db.Productos.findAll( {
            limit: 8,
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

            return res.render('index', {
                data: result,
            })
        }).catch((err) => {
            console.log(err);
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
                return res.send('login');
            }

        }).catch((err) => {
            console.log(err);
        });
        }
    },

        
    logout: (req,res) => {

        req.session.destroy();
        res.clearCookie('userId');      
        return res.redirect("/")
        
    } 
};



module.exports = indexController;





