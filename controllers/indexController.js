const data = require('../db/data'); //esto seguro hay q sacarlo
const db = require("../database/models"); //Requiero db 
const user = db.User; //Alias de la db

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');

const indexController = {
    index: function (req,res) {
        return res.render('index', {
            data: data.producto,
        })
    },
    register: function (req,res) {
        return res.render('register')
    },
    procesarRegister : (req, res) => {
        let info = req.body;
        let usuario = {
            username : info.username,
            email : info.email,
            password : bcrypt.hashSync(info.password, 10),
            remember_token : "false",
            created_at : new Date(),
            updated_at :  new Date(),
        }

        user.create(usuario)
        .then((result) => {
            return res.redirect("/profile")
        }).catch((err) => {
            return res.send(err)
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
};

module.exports = indexController;





