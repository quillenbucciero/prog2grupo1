module.exports = function(sequelize, dataTypes){
    
    let alias = 'prog2'

    let cols = {
        seguidor_id: {
            type: dataTypes.INTEGER
        },
        seguido_id: {
            type: dataTypes.INTEGER
        },

    }
    let config = {
        tableName: 'movies', 
        timestamps: false, 
        underscored: true, 
    }

    const prog2 = sequelize.define(alias, cols, config);

    return prog2;

}