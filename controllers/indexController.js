const data = require('../db/data'); //esto seguro hay q sacarlo
const db = require("../database/models"); //Requiero db 
const User = db.User; //Alias de la db

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');

const indexController = {
    index: function (req,res) {

        db.Productos.findAll( {
            limit: 8,
            order: [
                ['created_at', 'desc'] 
            ],
            include: [
                {association: "usuarios"}
            ]
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

        let profilePhoto = req.file.filename;

        let info = req.body;
        let usuario = { 
            username: info.username,
            email : info.email,
            password : bcrypt.hashSync(info.password, 10),
            remember_token : "false",
            fechaDeNacimiento: info.date,
            documento: info.doc,
            created_at : new Date(),
            updated_at :  new Date(),
            fotoDePerfil : profilePhoto
        }

        user.create(usuario)
        .then((result) => {
            return res.redirect("/profile")
        }).catch((err) => {
            console.log(err);
        });

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





