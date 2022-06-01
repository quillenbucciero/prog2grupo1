module.exports = function(sequelize, dataTypes){
    
    let alias = 'prog2-Seguidores'

    let cols = {
        seguidor_id: {
            type: dataTypes.INTEGER
        },
        seguido_id: {
            type: dataTypes.INTEGER
        },

    }
    let config = {
        tableName: 'Seguidores', 
        timestamps: false, 
        underscored: true, 
    }

    const Seguidores = sequelize.define(alias, cols, config);

    return Seguidores;

}