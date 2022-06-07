const db = require("../database/models"); //Requiero db 
const Usuarios = db.Usuarios; //Alias de la db

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');

const indexController = {
    index: function (req,res) {

        db.Productos.findAll( {
            limit: 8,
            order: [
                ['created_at', 'desc'] 
            ],
            /*include: [
                {association: "usuarios"}
            ]*/
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

        if (req.body.nombre = "") {
            erroresRegister.message = "El nombre está vacío";
            res.locals.erroresRegister = erroresRegister;
            return res.render('register')
        } else if (req.body.email = "") {
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
            let usuarioNuevo = { 
                nombre : req.body.nombre,
                email : req.body.email,
                contrasena : bcrypt.hashSync(req.body.contrasena, 10),
                fecha_de_nacimiento: req.body.fecha_de_nacimiento,
                documento: req.body.documento,
                created_at : new Date(),
                updated_at :  new Date(),
                foto_de_perfil: req.file.filename
            };

            Usuarios.create(usuarioNuevo)
            .then((result) => {
                return res.redirect("/profile")
            }).catch((err) => {
                "Este es el error" +err;
            });
        }       
    },
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
    logout: (req,res) => {

        req.session.destroy();
        res.clearCookie('userId');      
        return res.redirect("/")
        
    } 
};

module.exports = indexController;





