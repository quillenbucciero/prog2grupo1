module.exports = function (sequelize, dataTypes){
    
    let alias = 'prog2';  
​
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
        fechaDeNacimiento : {
            type: dataTypes.DATE,
        },
        documento : {
            type: dataTypes.INTEGER,

        },
        fotoDePerfil: {
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
        tableName : "users",
        timestamps:true,
        underscored: true, 
    };

    const prog2 = sequelize.define(alias, cols, config);

    return prog2;

}