module.exports = function(sequelize, dataTypes){
    
    let alias = 'prog2'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        texto: {
            type: dataTypes.STRING
        },
        imagenUsuario:{
            type: dataTypes.STRING
        },
        producto_id: {

        },
        usuario_id: {

        }
    }
    let config = {
        tableName: 'movies', 
        timestamps: false, 
        underscored: true, 
    }

    const prog2 = sequelize.define(alias, cols, config);

    return prog2;

}