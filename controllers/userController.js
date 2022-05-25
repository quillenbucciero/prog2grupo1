const db = require("../database/models");
const user = db.User;

/* Requerir mi modulo instalado */
const bcrypt = require('bcryptjs');

const userController = {
    login : (req, res) => {
        return res.render("login")
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
    register : (req, res) => {
        return res.render("register")
    },
    procesarRegister : (req, res) => {
        let info = req.body;
        let usuario = {
            name : info.name,
            email : info.email,
            password : bcrypt.hashSync(info.password, 10),
            remember_token : "false",
            created_at : new Date(),
            updated_at :  new Date(),
        }

        user.create(usuario)
        .then((result) => {
            return res.redirect("/profile/edit")
        }).catch((err) => {
            
        });
        
    },
}

module.exports = userController;