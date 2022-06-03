module.exports = function(sequelize, dataTypes){
    
    let alias = 'Comentarios'

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        texto: {
            type: dataTypes.STRING
        },
        imagen:{
            type: dataTypes.STRING
        },
        producto_id: {
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'Comentarios', 
        timestamps: false, 
        underscored: true, 
    }

    const Comentarios = sequelize.define(alias, cols, config);

    return Comentarios;

}