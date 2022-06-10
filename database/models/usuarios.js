module.exports = function (sequelize, dataTypes){
    
    let alias = 'Usuarios';  
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido : {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        contrasena: {
            type: dataTypes.STRING
        },
        fecha_de_nacimiento : {
            type: dataTypes.DATE,
        },
        documento : {
            type: dataTypes.INTEGER,

        },
        foto_de_perfil: {
            type: dataTypes.STRING
        },
        created_at : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },
    }

    let config = {
        tableName : "usuarios",
        timestamps:true,
        underscored: true, 
    };

    const Usuarios = sequelize.define(alias, cols, config);

    //Relación con productos.
    Usuarios.associate = function (models) { 
        Usuarios.hasMany(models.Productos , {
            as: "productos",
            foreignKey: "usuario_id"
        })
    }; 

    //Relación con comentarios
    /*Usuarios.associate = function (models) { 
        Usuarios.hasMany(models.Comentarios , {
            as: "comentarios",
            foreignKey: "usuario_id"
        })
    }; */
   

    return Usuarios;

}